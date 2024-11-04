import httpStatus from "http-status";
import ApiError from "../../error/ApiError";
import prisma from "../../shared/prisma";
import { generateSlug } from "../../utils/generateSlug";
import { TCategoryPayload } from "./Category.interfaces";
import pagination from "../../utils/pagination";
import { Prisma } from "@prisma/client";
import {
  categorySearchableFields,
  categorySortableFields,
} from "./Category.constants";
import fieldValidityChecker from "../../utils/fieldValidityChecker";
import { sortOrderType } from "../../constants/common";

const addCategory = async (payload: TCategoryPayload) => {
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

  return result;
};

const getCategories = async (query: Record<string, any>) => {
  const { searchTerm, page, limit, sortBy, sortOrder, parent } = query;

  if (sortBy) {
    const res = fieldValidityChecker(categorySortableFields, sortBy);
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
        title: parent,
      },
    });
  }

  const whereConditions = {
    AND: andConditions,
  };

  const result = await prisma.category.findMany({
    where: whereConditions,
    skip: skip,
    take: limitNumber,
    orderBy: {
      [sortWith]: sortSequence,
    },
    include: {
      parent: true,
    },
  });

  const total = await prisma.category.count({ where: whereConditions });

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

const deleteCategory = async (id: string) => {
  await prisma.category.delete({
    where: {
      id,
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
