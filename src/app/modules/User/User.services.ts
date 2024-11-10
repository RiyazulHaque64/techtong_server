import { Prisma, UserRole, UserStatus } from "@prisma/client";
import pagination from "../../utils/pagination";
import {
  userSearchableFields,
  userSelectedFields,
  userSortableFields,
} from "./User.constants";
import prisma from "../../shared/prisma";
import { TAuthUser } from "../../interfaces/common";
import { TFile } from "../../interfaces/file";
import { fileUploader } from "../../utils/fileUploader";
import ApiError from "../../error/ApiError";
import httpStatus from "http-status";
import { TUpdateUserRoleAndStatusPayload } from "./User.interfaces";
import { TImage } from "../Image/Image.interfaces";
import fieldValidityChecker from "../../utils/fieldValidityChecker";
import { sortOrderType } from "../../constants/common";

const getUsers = async (query: Record<string, any>) => {
  const { searchTerm, page, limit, sortBy, sortOrder, ...remainingQuery } =
    query;

  if (sortBy) {
    fieldValidityChecker(userSortableFields, sortBy);
  }
  if (sortOrder) {
    fieldValidityChecker(sortOrderType, sortOrder);
  }

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } = pagination({
    page,
    limit,
    sortBy,
    sortOrder,
  });

  const andConditions: Prisma.UserWhereInput[] = [{ is_deleted: false }];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field) => {
        return {
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        };
      }),
    });
  }

  if (Object.keys(remainingQuery).length) {
    Object.keys(remainingQuery).forEach((key) => {
      andConditions.push({
        [key]: remainingQuery[key],
      });
    });
  }

  const whereConditions = {
    AND: andConditions,
  };

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip: skip,
    take: limitNumber,
    orderBy: {
      [sortWith]: sortSequence,
    },
    select: {
      ...userSelectedFields,
    },
  });

  const total = await prisma.user.count({ where: whereConditions });

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: result,
  };
};

const getUser = async (id: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id,
      status: UserStatus.ACTIVE,
      is_deleted: false,
    },
    select: {
      ...userSelectedFields,
    },
  });
  return result;
};

const getMe = async (user: TAuthUser | undefined) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: user?.id,
    },
    select: {
      ...userSelectedFields,
    },
  });
  return result;
};

const updateProfile = async (
  user: TAuthUser | undefined,
  payload: Record<string, any>,
  file: TFile | undefined
) => {
  const image: Record<string, string> = {};
  if (file) {
    const userData = await prisma.user.findUniqueOrThrow({
      where: {
        id: user?.id,
      },
      select: {
        profile_pic: true,
      },
    });
    userData &&
      userData.profile_pic &&
      (await fileUploader.deleteToCloudinary([
        userData?.profile_pic?.cloud_id,
      ]));
    userData &&
      userData.profile_pic &&
      (await prisma.image.delete({
        where: {
          id: userData.profile_pic.id,
        },
      }));
    const convertedFile = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${convertedFile}`;
    const cloudinaryResponse = await fileUploader.uploadToCloudinary(dataURI);
    image["path"] = cloudinaryResponse?.secure_url as string;
    image["cloud_id"] = cloudinaryResponse?.public_id as string;
    image["name"] = file.originalname;
  }

  let profilePic;

  if (image.path && image.cloud_id) {
    profilePic = await prisma.image.create({
      data: image as TImage,
    });
  }

  if (profilePic?.id) {
    payload.profile_pic_id = profilePic?.id;
  }

  const result = prisma.user.update({
    where: {
      id: user?.id,
    },
    data: payload,
    select: {
      ...userSelectedFields,
    },
  });

  return result;
};

const updateUserRoleAndStatus = async (
  user: TAuthUser | undefined,
  payload: TUpdateUserRoleAndStatusPayload
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
      is_deleted: false,
    },
  });
  if (userData.role === UserRole.SUPER_ADMIN && user?.role === UserRole.ADMIN) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to update this user"
    );
  }
  if (user?.role === UserRole.ADMIN && payload.role === UserRole.SUPER_ADMIN) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to update this"
    );
  }
  const result = await prisma.user.update({
    where: {
      id: userData.id,
    },
    data: payload,
    select: {
      ...userSelectedFields,
    },
  });
  return result;
};

const deleteUser = async (
  user: TAuthUser | undefined,
  payload: { id: string }
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
    },
  });
  if (userData.role === UserRole.SUPER_ADMIN && user?.role === UserRole.ADMIN) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to delete this user"
    );
  }
  const result = await prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      is_deleted: true,
    },
  });

  return result;
};

export const UserServices = {
  getUsers,
  getUser,
  getMe,
  updateProfile,
  updateUserRoleAndStatus,
  deleteUser,
};
