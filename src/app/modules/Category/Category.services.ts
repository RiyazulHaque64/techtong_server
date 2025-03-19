import { Prisma } from "@prisma/client";
import httpStatus from "http-status";
import { io } from "../../../server";
import ApiError from "../../error/ApiError";
import prisma from "../../shared/prisma";
import { generateSlug } from "../../utils/generateSlug";
import pagination from "../../utils/pagination";
import validateQueryFields from "../../utils/validateQueryFields";
import {
  categoryFieldsValidationConfig,
  categorySearchableFields,
} from "./Category.constants";
import { TCategoryPayload } from "./Category.interfaces";

const addCategory = async (payload: TCategoryPayload) => {
  if (payload.parent_id) {
    const parent_category = await prisma.category.findFirst({
      where: {
        id: payload.parent_id,
      },
    });
    if (!parent_category)
      throw new ApiError(httpStatus.NOT_FOUND, "Parent category not found");
  }
  const category = {
    title: payload.title,
    slug: generateSlug(payload.title),
    description: payload.description || null,
    parent_id: payload.parent_id || null,
    icon: payload.icon || null,
  };

  const result = await prisma.category.create({
    data: category,
  });

  io.emit("create_category", result)

  return result;
};

const getCategories = async (query: Record<string, any>) => {
  const { searchTerm, page, limit, sortBy, sortOrder, parent } = query;

  if (sortBy)
    validateQueryFields(categoryFieldsValidationConfig, "sort_by", sortBy);
  if (sortOrder)
    validateQueryFields(
      categoryFieldsValidationConfig,
      "sort_order",
      sortOrder
    );

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } = pagination({
    page,
    limit,
    sortBy,
    sortOrder,
  });

  const andConditions: Prisma.CategoryWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: categorySearchableFields.map((field) => {
        return {
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        };
      }),
    });
  }

  if (parent) {
    andConditions.push({
      parent: {
        title: {
          equals: parent,
          mode: "insensitive",
        },
      },
    });
  }

  const whereConditions = {
    AND: andConditions,
  };

  const orderBy: Prisma.CategoryOrderByWithRelationInput =
    sortWith === "products"
      ? {
        products: {
          _count: sortSequence,
        },
      }
      : {
        [sortWith]: sortSequence,
      };

  const [result, total] = await Promise.all([
    prisma.category.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy,
      include: {
        parent: {
          select: {
            id: true,
            title: true,
            slug: true,
            icon: true,
            description: true,
          },
        },
        _count: {
          select: {
            products: true,
          },
        },
      },
    }),
    prisma.category.count({ where: whereConditions }),
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

const getCategory = async (id: string) => {
  const result = await prisma.category.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      parent: true,
    },
  });
  return result;
};

const updateCategory = async (id: string, payload: TCategoryPayload) => {
  if (payload.parent_id) {
    const parent_category = await prisma.category.findFirst({
      where: {
        id: payload.parent_id,
      },
    });
    if (!parent_category) {
      throw new ApiError(httpStatus.NOT_FOUND, "Parent category not found");
    }
  }
  if (payload.title) {
    payload.slug = generateSlug(payload.title);
  }
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
    include: {
      parent: true,
    },
  });
  return result;
};

const deleteCategory = async ({ ids }: { ids: string[] }) => {
  await prisma.category.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  return null;
};

export const CategoryServices = {
  addCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
};
