import httpStatus from "http-status";
import ApiError from "../../error/ApiError";
import { TCloudinaryResponse, TFiles } from "../../interfaces/file";
import { Prisma } from "@prisma/client";
import { fileUploader } from "../../utils/fileUploader";
import prisma from "../../shared/prisma";
import { Request } from "express";
import { TDeleteImagePayload } from "./Image.interfaces";

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
      images.push({
        path: cloudinaryResponse?.secure_url,
        cloud_id: cloudinaryResponse?.public_id,
      });
    }
  }

  const result = await prisma.image.createMany({
    data: images,
    skipDuplicates: true,
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
  deleteImages,
};
