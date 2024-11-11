import { Prisma } from "@prisma/client";
import { sortOrderType } from "../../constants/common";
import prisma from "../../shared/prisma";
import fieldValidityChecker from "../../utils/fieldValidityChecker";
import pagination from "../../utils/pagination";
import {
  couponSearchableFields,
  couponSortableFields,
} from "./Coupon.constants";
import { TCouponPayload } from "./Coupon.interfaces";
import addFilter from "../../utils/addFilter";

const createCoupon = async (payload: TCouponPayload) => {
  const { start_date, expiration_date, ...remainingField } = payload;

  const modified_start_date = start_date ? new Date(start_date) : new Date();
  const modified_expiration_date = new Date(expiration_date);

  if (modified_start_date > modified_expiration_date) {
    throw new Error("Start date cannot be greater than expiration date");
  }

  const result = await prisma.coupon.create({
    data: {
      ...remainingField,
      start_date: modified_start_date,
      expiration_date: modified_expiration_date,
    },
  });
  return result;
};

const getCoupons = async (query: Record<string, any>) => {
  const {
    searchTerm,
    page,
    limit,
    sortBy,
    sortOrder,
    min_value,
    max_value,
    from_expiration_date,
    to_expiration_date,
    ...remainingQuery
  } = query;

  if (sortBy) fieldValidityChecker(couponSortableFields, sortBy);
  if (sortOrder) fieldValidityChecker(sortOrderType, sortOrder);

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } = pagination({
    page,
    limit,
    sortBy,
    sortOrder,
  });

  const andConditions: Prisma.CouponWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: couponSearchableFields.map((field) => {
        return {
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        };
      }),
    });
  }

  if (Object.keys(remainingQuery).length) {
    Object.keys(remainingQuery).forEach((key) => {
      andConditions.push({
        [key]: remainingQuery[key],
      });
    });
  }

  addFilter(andConditions, "discount_value", "gte", min_value);
  addFilter(andConditions, "discount_value", "lte", max_value);
  addFilter(
    andConditions,
    "expiration_date",
    "gte",
    from_expiration_date ? new Date(from_expiration_date) : undefined
  );
  addFilter(
    andConditions,
    "expiration_date",
    "lte",
    to_expiration_date ? new Date(to_expiration_date) : undefined
  );

  const whereConditions = {
    AND: andConditions,
  };

  const result = await prisma.coupon.findMany({
    where: whereConditions,
    skip: skip,
    take: limitNumber,
    orderBy: {
      [sortWith]: sortSequence,
    },
  });

  const total = await prisma.coupon.count({ where: whereConditions });

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: result,
  };
};

export const CouponServices = {
  createCoupon,
  getCoupons,
};
