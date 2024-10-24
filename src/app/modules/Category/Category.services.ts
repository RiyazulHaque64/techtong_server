import httpStatus from "http-status";
import ApiError from "../../error/ApiError";
import prisma from "../../shared/prisma";
import { generateSlug } from "../../utils/generateSlug";
import { TAddCategoryPayload } from "./Category.interfaces";

const addCategory = async (payload: TAddCategoryPayload) => {
  if (payload.parent_id) {
    const parent_category = await prisma.category.findUniqueOrThrow({
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

export const CategoryServices = {
  addCategory,
};
