import httpStatus from "http-status";
import ApiError from "../../error/ApiError";
import { TCloudinaryResponse, TFiles } from "../../interfaces/file";
import { Prisma } from "@prisma/client";
import { fileUploader } from "../../utils/fileUploader";
import prisma from "../../shared/prisma";
import { Request } from "express";
import { TDeleteImagePayload } from "./Image.interfaces";
import pagination from "../../utils/pagination";
import { imageSearchableFields, imageSortableFields } from "./Image.constant";
import path from "path";
import fieldValidityChecker from "../../utils/fieldValidityChecker";
import { sortOrderType } from "../../constants/common";

const uploadImages = async (req: Request) => {
  const files = req.files as TFiles;

  if (!files?.images?.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No images found");
  }

  const images: Prisma.ImageCreateManyInput[] = [];

  if (files?.images) {
    for (let i = 0; i < files.images.length; i++) {
      const file = files.images[i];
      const convertedFile = Buffer.from(file.buffer).toString("base64");
      const dataURI = `data:${file.mimetype};base64,${convertedFile}`;
      const cloudinaryResponse = (await fileUploader.uploadToCloudinary(
        dataURI
      )) as TCloudinaryResponse;
      const fileName = path.parse(file.originalname).name;
      images.push({
        name: fileName,
        path: cloudinaryResponse?.secure_url,
        cloud_id: cloudinaryResponse?.public_id,
      });
    }
  }

  const result = await prisma.image.createMany({
    data: images,
    skipDuplicates: true,
  });

  return {
    uploaded_count: result.count,
    message: `${result.count} image has been uploaded`,
  };
};

const getImages = async (query: Record<string, any>) => {
  const { searchTerm, page, limit, sortBy, sortOrder } = query;

  if (sortBy) {
    const res = fieldValidityChecker(imageSortableFields, sortBy);
    if (!res.valid) {
      throw new ApiError(httpStatus.BAD_REQUEST, res.message);
    }
  }
  if (sortOrder) {
    const res = fieldValidityChecker(sortOrderType, sortOrder);
    if (!res.valid) {
      throw new ApiError(httpStatus.BAD_REQUEST, res.message);
    }
  }

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } = pagination({
    page,
    limit,
    sortBy,
    sortOrder,
  });

  const andConditions: Prisma.ImageWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: imageSearchableFields.map((field) => {
        return {
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        };
      }),
    });
  }

  const whereConditions = {
    AND: andConditions,
  };

  const result = await prisma.image.findMany({
    where: whereConditions,
    skip: skip,
    take: limitNumber,
    orderBy: {
      [sortWith]: sortSequence,
    },
  });

  const total = await prisma.image.count();

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: result,
  };
};

const getImage = async (id: string) => {
  const result = await prisma.image.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return result;
};

const changeImageName = async (id: string, payload: { name: string }) => {
  const { name } = payload;

  const image = await prisma.image.findFirst({
    where: {
      id,
    },
  });

  if (!image) {
    throw new ApiError(httpStatus.NOT_FOUND, "Image not found to update");
  }

  const result = await prisma.image.update({
    where: {
      id: id,
    },
    data: {
      name,
    },
  });
  return result;
};

const deleteImages = async (payload: TDeleteImagePayload) => {
  const { cloud_ids } = payload;
  const cloudinaryResponse = (await fileUploader.deleteToCloudinary(
    cloud_ids
  )) as any;

  if (!cloudinaryResponse) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to delete images"
    );
  }

  const deletedIds = Object.entries(cloudinaryResponse.deleted)
    .filter(([key, value]) => value === "deleted")
    .map(([key, value]) => key);

  if (deletedIds.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No valid id found to delete");
  }

  const result = await prisma.image.deleteMany({
    where: {
      cloud_id: {
        in: deletedIds,
      },
    },
  });

  return {
    deleted_count: result.count,
    message: `${result.count} image has been deleted`,
  };
};

export const ImageServices = {
  uploadImages,
  getImages,
  getImage,
  changeImageName,
  deleteImages,
};
