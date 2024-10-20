import httpStatus from "http-status";
import ApiError from "../../error/ApiError";
import { TCloudinaryResponse, TFiles } from "../../interfaces/file";
import { Prisma } from "@prisma/client";
import { fileUploader } from "../../utils/fileUploader";
import prisma from "../../shared/prisma";
import { Request } from "express";

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

const deleteImages = async (cloudIds: string[]) => {
  const cloudinaryResponse = await fileUploader.deleteToCloudinary(cloudIds);
  console.log(cloudinaryResponse);

  return null;
};

export const ImageServices = {
  uploadImages,
  deleteImages,
};
