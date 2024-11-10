import prisma from "../../shared/prisma";
import { generateSlug } from "../../utils/generateSlug";
import { TAttributePayload } from "./Attribute.interfaces";
import fieldValidityChecker from "../../utils/fieldValidityChecker";
import httpStatus from "http-status";
import ApiError from "../../error/ApiError";
import { sortOrderType } from "../../constants/common";
import { attributeSortableFields } from "./Attribute.constants";
import pagination from "../../utils/pagination";
import { Prisma } from "@prisma/client";

const addAttribute = async (payload: TAttributePayload) => {
  if (payload.category_id) {
    await prisma.category.findUniqueOrThrow({
      where: {
        id: payload.category_id,
      },
    });
  }
  payload.slug = generateSlug(payload.name);

  const result = await prisma.attribute.create({
    data: payload,
    include: {
      category: true,
    },
  });

  return result;
};

const getAttributes = async (query: Record<string, any>) => {
  const { searchTerm, page, limit, sortBy, sortOrder, category } = query;

  if (sortBy) {
    fieldValidityChecker(attributeSortableFields, sortBy);
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

  const andConditions: Prisma.AttributeWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: attributeSortableFields.map((field) => {
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

  const result = await prisma.attribute.findMany({
    where: whereConditions,
    skip: skip,
    take: limitNumber,
    orderBy: {
      [sortWith === "created_at" ? "name" : sortWith]: sortSequence,
    },
    include: {
      category: true,
    },
  });

  const total = await prisma.attribute.count({ where: whereConditions });

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: result,
  };
};

const getAttribute = async (id: string) => {
  const result = await prisma.attribute.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return result;
};

const updateAttribute = async (id: string, payload: TAttributePayload) => {
  if (payload.category_id) {
    await prisma.category.findUniqueOrThrow({
      where: {
        id: payload.category_id,
      },
    });
  }
  if (payload.name) {
    payload.slug = generateSlug(payload.name);
  }
  const result = await prisma.attribute.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });
  return result;
};

const deleteAttribute = async (id: string) => {
  await prisma.attribute.delete({
    where: {
      id,
    },
  });
  return null;
};

export const AttributeServices = {
  addAttribute,
  getAttributes,
  getAttribute,
  updateAttribute,
  deleteAttribute,
};
