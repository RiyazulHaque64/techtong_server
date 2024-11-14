import { Prisma, UserRole, UserStatus } from "@prisma/client";
import pagination from "../../utils/pagination";
import {
  userFieldsValidationConfig,
  userSearchableFields,
  userSelectedFields,
} from "./User.constants";
import prisma from "../../shared/prisma";
import { TAuthUser } from "../../interfaces/common";
import { TFile } from "../../interfaces/file";
import { fileUploader } from "../../utils/fileUploader";
import ApiError from "../../error/ApiError";
import httpStatus from "http-status";
import { TUpdateUserPayload } from "./User.interfaces";
import { TImage } from "../Image/Image.interfaces";
import validateQueryFields from "../../utils/validateQueryFields";

const getUsers = async (query: Record<string, any>) => {
  const { searchTerm, page, limit, sortBy, sortOrder, ...remainingQuery } =
    query;

  if (sortBy)
    validateQueryFields(userFieldsValidationConfig, "sort_by", sortBy);
  if (sortOrder)
    validateQueryFields(userFieldsValidationConfig, "sort_order", sortOrder);

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
    for (const [key, value] of Object.entries(remainingQuery)) {
      validateQueryFields(userFieldsValidationConfig, key, value);
      andConditions.push({
        [key]: value === "true" ? true : value === "false" ? false : value,
      });
    }
  }

  const whereConditions = {
    AND: andConditions,
  };

  const [result, total] = await Promise.all([
    prisma.user.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy: {
        [sortWith]: sortSequence,
      },
      select: {
        ...userSelectedFields,
      },
    }),
    prisma.user.count({ where: whereConditions }),
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
  let profilePic;

  if (file) {
    const image: Record<string, string> = {};
    const convertedFile = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${convertedFile}`;
    const cloudinaryResponse = await fileUploader.uploadToCloudinary(dataURI);
    image["path"] = cloudinaryResponse?.secure_url as string;
    image["cloud_id"] = cloudinaryResponse?.public_id as string;
    image["name"] = file.originalname;

    profilePic = await prisma.image.create({
      data: image as TImage,
    });

    const userInfo = await prisma.user.findUniqueOrThrow({
      where: {
        id: user?.id,
      },
    });

    if (userInfo.profile_pic) {
      const profilePic = await prisma.image.findFirst({
        where: {
          path: userInfo.profile_pic,
        },
      });
      if (profilePic) {
        await fileUploader.deleteToCloudinary([profilePic.cloud_id]);
        await prisma.image.delete({
          where: {
            id: profilePic.id,
          },
        });
      }
    }
  }

  if (profilePic?.path) {
    payload.profile_pic = profilePic.path;
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

const updateUser = async (
  user: TAuthUser | undefined,
  id: string,
  payload: TUpdateUserPayload
) => {
  await authorizeUserUpdate(user as TAuthUser, id);

  const [result] = await prisma.$transaction([
    prisma.user.update({
      where: {
        id,
        is_deleted: false,
      },
      data: payload,
      select: {
        ...userSelectedFields,
      },
    }),
  ]);

  if (!result) throw new ApiError(httpStatus.NOT_FOUND, "User not found");

  return result;
};

// Helper function to handle authorization checks
const authorizeUserUpdate = async (user: TAuthUser, id: string) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: { id },
    select: { role: true },
  });

  if (userData.role === UserRole.SUPER_ADMIN && user.role === UserRole.ADMIN) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Admins cannot modify Super Admin"
    );
  }
};

export const UserServices = {
  getUsers,
  getUser,
  getMe,
  updateProfile,
  updateUser,
};
