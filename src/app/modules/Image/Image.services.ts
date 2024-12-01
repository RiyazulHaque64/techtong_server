import httpStatus from "http-status";
import ApiError from "../../error/ApiError";
import { TCloudinaryResponse, TFiles } from "../../interfaces/file";
import { Prisma } from "@prisma/client";
import { fileUploader } from "../../utils/fileUploader";
import prisma from "../../shared/prisma";
import { Request } from "express";
import { TDeleteImagePayload } from "./Image.interfaces";
import pagination from "../../utils/pagination";
import {
  imageFieldsValidationConfig,
  imageSearchableFields,
} from "./Image.constant";
import path from "path";
import validateQueryFields from "../../utils/validateQueryFields";
import supabase from "../../shared/supabase";
import sharp from "sharp";
import { TAuthUser } from "../../interfaces/common";

const uploadImages = async (req: Request & { user?: TAuthUser }) => {
  const files = req.files as TFiles;
  const user = req.user;

  if (!files?.images?.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No images found");
  }

  const images: Prisma.ImageCreateManyInput[] = [];

  if (files?.images) {
    for (let i = 0; i < files.images.length; i++) {
      const file = files.images[i];
      const metadata = await sharp(file.buffer).metadata();

      const { data } = await supabase.storage
        .from("techtong")
        .upload(file.originalname, file.buffer, {
          contentType: file.mimetype,
        });

      if (data?.id) {
        images.push({
          user_id: user?.id,
          name: file.originalname,
          alt_text: file.originalname,
          type: file.mimetype,
          size: file.size,
          width: metadata.width || 0,
          height: metadata.height || 0,
          path: data.path,
          bucket_id: data.id,
        });
      }
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

  if (sortBy)
    validateQueryFields(imageFieldsValidationConfig, "sort_by", sortBy);
  if (sortOrder)
    validateQueryFields(imageFieldsValidationConfig, "sort_order", sortOrder);

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

  const [result, total] = await Promise.all([
    prisma.image.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy: {
        [sortWith]: sortSequence,
      },
    }),
    prisma.image.count({ where: whereConditions }),
  ]);

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
      bucket_id: {
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
