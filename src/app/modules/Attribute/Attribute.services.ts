import prisma from "../../shared/prisma";
import { generateSlug } from "../../utils/generateSlug";
import { TAttributePayload } from "./Attribute.interfaces";
import {
  attributeFieldsValidationConfig,
  attributeSearchableFields,
} from "./Attribute.constants";
import pagination from "../../utils/pagination";
import { Prisma } from "@prisma/client";
import validateQueryFields from "../../utils/validateQueryFields";

const addAttribute = async (payload: TAttributePayload) => {
  if (payload.value) payload.value = payload.value.map((v) => v.toLowerCase());
  if (payload.value)
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
      category: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  return result;
};

const getAttributes = async (query: Record<string, any>) => {
  const { searchTerm, page, limit, sortBy, sortOrder, category } = query;

  if (sortBy)
    validateQueryFields(attributeFieldsValidationConfig, "sort_by", sortBy);
  if (sortOrder)
    validateQueryFields(
      attributeFieldsValidationConfig,
      "sort_order",
      sortOrder
    );

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } = pagination({
    page,
    limit,
    sortBy,
    sortOrder,
  });

  const andConditions: Prisma.AttributeWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: attributeSearchableFields.map((field) => {
        return {
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        };
      }),
    });
  }

  if (category) {
    const categories = category.split(",");
    andConditions.push({
      category: {
        title: {
          in: categories,
          mode: "insensitive",
        },
      },
    });
  }

  const whereConditions = {
    AND: andConditions,
  };

  const orderBy: Prisma.AttributeOrderByWithRelationInput =
    sortWith === "name"
      ? {
          name: sortSequence,
        }
      : sortWith === "category"
      ? {
          category: {
            title: sortSequence,
          },
        }
      : {
          created_at: sortSequence,
        };

  const [result, total] = await Promise.all([
    prisma.attribute.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy,
      include: {
        category: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    }),
    prisma.attribute.count({ where: whereConditions }),
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

const deleteAttribute = async ({ ids }: { ids: string[] }) => {
  await prisma.attribute.deleteMany({
    where: {
      id: {
        in: ids,
      },
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
