import prisma from "../../shared/prisma";
import { generateSlug } from "../../utils/generateSlug";
import { IProductPayload } from "./Product.interfaces";
import pagination from "../../utils/pagination";
import { Prisma } from "@prisma/client";
import {
  brandSelectFieldsWithProduct,
  categorySelectFieldsWithProduct,
  productFieldsValidationConfig,
  productSearchableFields,
} from "./Product.constants";
import validateQueryFields from "../../utils/validateQueryFields";
import addFilter from "../../utils/addFilter";

const addProduct = async (payload: IProductPayload) => {
  payload.slug = generateSlug(payload.name);
  const result = await prisma.product.create({
    data: payload,
    include: {
      brand: {
        select: {
          ...brandSelectFieldsWithProduct,
        },
      },
      category: {
        select: {
          ...categorySelectFieldsWithProduct,
        },
      },
    },
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
    minPrice,
    maxPrice,
    ...remainingQuery
  } = query;

  if (sortBy)
    validateQueryFields(productFieldsValidationConfig, "sort_by", sortBy);
  if (sortOrder)
    validateQueryFields(productFieldsValidationConfig, "sort_order", sortOrder);

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } = pagination({
    page,
    limit,
    sortBy,
    sortOrder,
  });

  const andConditions: Prisma.ProductWhereInput[] = [{ is_deleted: false }];

  if (searchTerm) {
    const words: string[] = searchTerm
      .split(" ")
      .filter((word: string) => word.length > 0);
    andConditions.push({
      OR: words.flatMap((word: string) => [
        ...productSearchableFields.map((field) => ({
          [field]: {
            contains: word,
            mode: "insensitive",
          },
        })),
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

  if (brand)
    andConditions.push({
      brand: {
        name: {
          equals: brand,
          mode: "insensitive",
        },
      },
    });

  if (category)
    andConditions.push({
      category: {
        title: {
          equals: category,
          mode: "insensitive",
        },
      },
    });

  if (published)
    andConditions.push({
      published: published === "true" ? true : false,
    });

  if (featured)
    andConditions.push({
      featured: featured === "true" ? true : false,
    });

  addFilter(andConditions, "price", "gte", Number(minPrice));
  addFilter(andConditions, "price", "lte", Number(maxPrice));

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

  const [result, total] = await Promise.all([
    prisma.product.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy: {
        [sortWith]: sortSequence,
      },
      include: {
        brand: {
          select: {
            ...brandSelectFieldsWithProduct,
          },
        },
        category: {
          select: {
            ...categorySelectFieldsWithProduct,
          },
        },
      },
    }),
    prisma.product.count({ where: whereConditions }),
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
    include: {
      brand: { select: { ...brandSelectFieldsWithProduct } },
      category: { select: { ...categorySelectFieldsWithProduct } },
    },
  });
  return result;
};

const deleteProduct = async (id: string) => {
  await prisma.product.update({
    where: {
      id,
    },
    data: {
      is_deleted: true,
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
