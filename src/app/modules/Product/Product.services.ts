import httpStatus from "http-status";
import ApiError from "../../error/ApiError";
import prisma from "../../shared/prisma";
import fieldValidityChecker from "../../utils/fieldValidityChecker";
import { generateSlug } from "../../utils/generateSlug";
import { IProductPayload } from "./Product.interfaces";
import { sortOrderType } from "../../constants/common";
import pagination from "../../utils/pagination";
import { Prisma } from "@prisma/client";
import {
  productSearchableFields,
  productSortableFields,
} from "./Product.constants";

const addProduct = async (payload: IProductPayload) => {
  payload.slug = generateSlug(payload.name);
  const result = await prisma.product.create({
    data: payload,
    include: { brand: true, category: true },
  });
  return result;
};

const getProducts = async (query: Record<string, any>) => {
  const {
    searchTerm,
    page,
    limit,
    sortBy,
    sortOrder,
    brand,
    category,
    published,
    featured,
    ...remainingQuery
  } = query;

  if (sortBy) {
    const res = fieldValidityChecker(productSortableFields, sortBy);
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

  const andConditions: Prisma.ProductWhereInput[] = [];

  if (searchTerm) {
    const words: string[] = searchTerm
      .split(" ")
      .filter((word: string) => word.length > 0);
    andConditions.push({
      OR: words.flatMap((word: string) => [
        ...productSearchableFields.map((field) => {
          return {
            [field]: {
              contains: word,
              mode: "insensitive",
            },
          };
        }),
        {
          brand: {
            name: {
              contains: word,
              mode: "insensitive",
            },
          },
        },
        {
          category: {
            title: {
              contains: word,
              mode: "insensitive",
            },
          },
        },
      ]),
    });
  }

  if (brand) {
    andConditions.push({
      brand: {
        name: {
          equals: brand,
          mode: "insensitive",
        },
      },
    });
  }

  if (category) {
    andConditions.push({
      category: {
        title: {
          equals: category,
          mode: "insensitive",
        },
      },
    });
  }

  if (published) {
    andConditions.push({
      published: published === "true" ? true : false,
    });
  }

  if (featured) {
    andConditions.push({
      featured: featured === "true" ? true : false,
    });
  }

  if (Object.keys(remainingQuery).length) {
    Object.keys(remainingQuery).forEach((key) => {
      const queryValue = remainingQuery[key].includes(",")
        ? remainingQuery[key].split(",")
        : remainingQuery[key];
      if (Array.isArray(queryValue)) {
        andConditions.push({
          OR: queryValue.map((value: string) => ({
            attributes: {
              array_contains: [
                {
                  slug: key,
                  value,
                },
              ],
            },
          })),
        });
      } else {
        andConditions.push({
          attributes: {
            array_contains: [
              {
                slug: key,
                value: queryValue,
              },
            ],
          },
        });
      }
    });
  }

  const whereConditions = {
    AND: andConditions,
  };

  const result = await prisma.product.findMany({
    where: whereConditions,
    skip: skip,
    take: limitNumber,
    orderBy: {
      [sortWith]: sortSequence,
    },
    include: { brand: true, category: true },
  });

  const total = await prisma.product.count({ where: whereConditions });

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: result,
  };
};

const getSingleProduct = async (id: string) => {
  const result = await prisma.product.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      brand: true,
      category: true,
    },
  });
  return result;
};

const updateProduct = async (id: string, payload: IProductPayload) => {
  if (payload.name) {
    payload.slug = generateSlug(payload.name);
  }
  const result = await prisma.product.update({
    where: {
      id,
    },
    data: payload,
    include: { brand: true, category: true },
  });
  return result;
};

const deleteProduct = async (id: string) => {
  await prisma.product.delete({
    where: {
      id,
    },
  });
  return null;
};

export const ProductServices = {
  addProduct,
  updateProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
};
