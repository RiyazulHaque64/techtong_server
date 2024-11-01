import httpStatus from "http-status";
import ApiError from "../../error/ApiError";
import prisma from "../../shared/prisma";
import fieldValidityChecker from "../../utils/fieldValidityChecker";
import { TAuthUser } from "./../../interfaces/common";
import {
  addressSearchableFields,
  addressSortableFields,
} from "./Address.constants";
import { TAddressPayload } from "./Address.interfaces";
import { sortOrderType } from "../../constants/common";
import pagination from "../../utils/pagination";
import { Prisma } from "@prisma/client";
import { userSelectedFields } from "../User/User.constants";

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

  if (sortBy) {
    const res = fieldValidityChecker(addressSortableFields, sortBy);
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
    Object.keys(remainingQuery).forEach((key) => {
      andConditions.push({
        [key]: remainingQuery[key],
      });
    });
  }

  const whereConditions = {
    AND: andConditions,
  };

  const result = await prisma.address.findMany({
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
  });

  const total = await prisma.address.count({ where: whereConditions });

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

  if (sortBy) {
    const res = fieldValidityChecker(addressSortableFields, sortBy);
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
    Object.keys(remainingQuery).forEach((key) => {
      andConditions.push({
        [key]: remainingQuery[key],
      });
    });
  }

  const whereConditions = {
    AND: andConditions,
  };

  const result = await prisma.address.findMany({
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
  });

  const total = await prisma.address.count({ where: whereConditions });

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
  const result = await prisma.address.delete({
    where: {
      id,
    },
  });
  return result;
};

export const AddressServices = {
  addAddress,
  getAllAddresses,
  getMyAddresses,
  getMySingleAddress,
  updateAddress,
  deleteAddress,
};
