import { Prisma } from "@prisma/client";
import prisma from "../../shared/prisma";
import { generateSlug } from "../../utils/generateSlug";
import pagination from "../../utils/pagination";
import { TBrandPayload } from "./Brand.interfaces";
import {
  brandFieldsValidationConfig,
  brandSearchableFields,
  brandSortableFields,
} from "./Brand.constants";
import ApiError from "../../error/ApiError";
import httpStatus from "http-status";
import fieldValidityChecker from "../../utils/fieldValidityChecker";
import { sortOrderType } from "../../constants/common";
import validateQueryFields from "../../utils/validateQueryFields";

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

  if (sortBy)
    validateQueryFields(brandFieldsValidationConfig, "sort_by", sortBy);
  if (sortOrder)
    validateQueryFields(brandFieldsValidationConfig, "sort_order", sortOrder);

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

  const [result, total] = await Promise.all([
    prisma.brand.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy: {
        [sortWith]: sortSequence,
      },
    }),
    await prisma.brand.count({ where: whereConditions }),
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

const getBrand = async (id: string) => {
  const result = await prisma.brand.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return result;
};

const updateBrand = async (id: string, payload: TBrandPayload) => {
  if (payload.name) {
    payload.slug = generateSlug(payload.name);
  }
  const result = await prisma.brand.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteBrand = async (id: string) => {
  await prisma.brand.delete({
    where: {
      id,
    },
  });
  return null;
};

export const BrandServices = {
  addBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
};
