import { Prisma } from "@prisma/client";
import prisma from "../../shared/prisma";
import { generateSlug } from "../../utils/generateSlug";
import pagination from "../../utils/pagination";
import { TBrandPayload } from "./Brand.interfaces";
import { brandSearchableFields, brandSortableFields } from "./Brand.constants";
import ApiError from "../../error/ApiError";
import httpStatus from "http-status";
import fieldValidityChecker from "../../utils/fieldValidityChecker";
import { sortOrderType } from "../../constants/common";

const addBrand = async (payload: TBrandPayload) => {
  const brand = {
    name: payload.name,
    slug: generateSlug(payload.name),
    description: payload.description || null,
    icon: payload.icon || null,
  };

  const result = await prisma.brand.create({
    data: brand,
  });

  return result;
};

const getBrands = async (query: Record<string, any>) => {
  const { searchTerm, page, limit, sortBy, sortOrder } = query;

  if (sortBy) {
    const res = fieldValidityChecker(brandSortableFields, sortBy);
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

  const andConditions: Prisma.BrandWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: brandSearchableFields.map((field) => {
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

  const result = await prisma.brand.findMany({
    where: whereConditions,
    skip: skip,
    take: limitNumber,
    orderBy: {
      [sortWith]: sortSequence,
    },
  });

  const total = await prisma.brand.count();

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: result,
  };
};

export const BrandServices = {
  addBrand,
  getBrands,
};
