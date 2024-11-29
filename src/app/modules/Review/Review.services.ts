import httpStatus from "http-status";
import ApiError from "../../error/ApiError";
import prisma from "../../shared/prisma";
import { TAuthUser } from "./../../interfaces/common";
import { TCreateReviewPayload } from "./Review.interface";
import validateQueryFields from "../../utils/validateQueryFields";
import {
  reviewFieldsValidationConfig,
  reviewSelectedFields,
} from "./Review.constants";
import pagination from "../../utils/pagination";
import { Prisma } from "@prisma/client";
const createReview = async (
  user: TAuthUser | undefined,
  payload: TCreateReviewPayload
) => {
  const product = await prisma.product.findUnique({
    where: {
      id: payload.product_id,
      is_deleted: false,
    },
    select: {
      id: true,
    },
  });

  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, "The product does not exist");
  }

  const result = await prisma.review.create({
    data: {
      user_id: (user as TAuthUser).id,
      ...payload,
    },
  });
  return result;
};

const getReviewsByProductId = async (
  product_id: string,
  query: Record<string, any>
) => {
  const { page, limit, sortBy, sortOrder } = query;

  if (sortBy)
    validateQueryFields(reviewFieldsValidationConfig, "sort_by", sortBy);
  if (sortOrder)
    validateQueryFields(reviewFieldsValidationConfig, "sort_order", sortOrder);

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } = pagination({
    page,
    limit,
    sortBy,
    sortOrder,
  });

  const andConditions: Prisma.ReviewWhereInput[] = [{ product_id: product_id }];

  const whereConditions = {
    AND: andConditions,
  };

  const [result, total] = await Promise.all([
    prisma.review.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy: {
        [sortWith]: sortSequence,
      },
      select: {
        ...reviewSelectedFields,
      },
    }),
    prisma.review.count({ where: whereConditions }),
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

export const ReviewServices = { createReview, getReviewsByProductId };
