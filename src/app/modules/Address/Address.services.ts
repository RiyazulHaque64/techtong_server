import httpStatus from "http-status";
import ApiError from "../../error/ApiError";
import prisma from "../../shared/prisma";
import { TAuthUser } from "./../../interfaces/common";
import {
  addressFieldsValidationConfig,
  addressSearchableFields,
} from "./Address.constants";
import { TAddressPayload } from "./Address.interfaces";
import pagination from "../../utils/pagination";
import { Prisma } from "@prisma/client";
import { userSelectedFields } from "../User/User.constants";
import validateQueryFields from "../../utils/validateQueryFields";

const addAddress = async (
  user: TAuthUser | undefined,
  payload: TAddressPayload
) => {
  const { id, contact_number, email } = user as TAuthUser;
  const address = {
    user_id: id,
    contact_number: payload.contact_number || contact_number,
    email: payload.email || email || null,
    address: payload.address,
    city: payload.city,
  };
  const result = await prisma.address.create({
    data: address,
    include: {
      user: {
        select: {
          ...userSelectedFields,
        },
      },
    },
  });
  return result;
};

const getAllAddresses = async (query: Record<string, any>) => {
  const { searchTerm, page, limit, sortBy, sortOrder, ...remainingQuery } =
    query;

  if (sortBy)
    validateQueryFields(addressFieldsValidationConfig, "sort_by", sortBy);
  if (sortOrder)
    validateQueryFields(addressFieldsValidationConfig, "sort_order", sortOrder);

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } = pagination({
    page,
    limit,
    sortBy,
    sortOrder,
  });

  const andConditions: Prisma.AddressWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: addressSearchableFields.map((field) => {
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
      andConditions.push({
        [key]: value,
      });
    }
  }

  const whereConditions = {
    AND: andConditions,
  };

  const [result, total] = await Promise.all([
    prisma.address.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy: {
        [sortWith === "created_at" ? "city" : sortWith]: sortSequence,
      },
      include: {
        user: {
          select: {
            ...userSelectedFields,
          },
        },
      },
    }),
    await prisma.address.count({ where: whereConditions }),
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

const getMyAddresses = async (
  user: TAuthUser | undefined,
  query: Record<string, any>
) => {
  const { searchTerm, page, limit, sortBy, sortOrder, ...remainingQuery } =
    query;

  if (sortBy)
    validateQueryFields(addressFieldsValidationConfig, "sort_by", sortBy);
  if (sortOrder)
    validateQueryFields(addressFieldsValidationConfig, "sort_order", sortOrder);

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } = pagination({
    page,
    limit,
    sortBy,
    sortOrder,
  });

  const andConditions: Prisma.AddressWhereInput[] = [{ user_id: user?.id }];

  if (searchTerm) {
    andConditions.push({
      OR: addressSearchableFields.map((field) => {
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
      andConditions.push({
        [key]: value,
      });
    }
  }

  const whereConditions = {
    AND: andConditions,
  };

  const [result, total] = await Promise.all([
    prisma.address.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy: {
        [sortWith === "created_at" ? "city" : sortWith]: sortSequence,
      },
      include: {
        user: {
          select: {
            ...userSelectedFields,
          },
        },
      },
    }),
    await prisma.address.count({ where: whereConditions }),
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

const getMySingleAddress = async (user: TAuthUser | undefined, id: string) => {
  const address = await prisma.address.findUniqueOrThrow({
    where: {
      id,
    },
  });
  if (address.user_id !== user?.id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Address not found");
  }
  const result = await prisma.address.findFirst({
    where: {
      user_id: user?.id,
      id,
    },
    include: {
      user: {
        select: {
          ...userSelectedFields,
        },
      },
    },
  });
  return result;
};

const updateAddress = async (
  user: TAuthUser | undefined,
  id: string,
  payload: TAddressPayload
) => {
  const address = await prisma.address.findUniqueOrThrow({
    where: {
      id,
    },
  });
  if (address.user_id !== user?.id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Address not found");
  }
  const result = await prisma.address.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteAddress = async (user: TAuthUser | undefined, id: string) => {
  const address = await prisma.address.findUniqueOrThrow({
    where: {
      id,
    },
  });
  if (address.user_id !== user?.id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Address not found");
  }
  await prisma.address.delete({
    where: {
      id,
    },
  });
  return null;
};

export const AddressServices = {
  addAddress,
  getAllAddresses,
  getMyAddresses,
  getMySingleAddress,
  updateAddress,
  deleteAddress,
};
