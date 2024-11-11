import { Prisma } from "@prisma/client";
import prisma from "../../shared/prisma";
import pagination from "../../utils/pagination";
import {
  couponFieldsValidationConfig,
  couponSearchableFields,
} from "./Coupon.constants";
import { TCouponPayload } from "./Coupon.interfaces";
import addFilter from "../../utils/addFilter";
import validateQueryFields from "../../utils/validateQueryFields";

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
    minValue,
    maxValue,
    ...remainingQuery
  } = query;

  if (sortBy)
    validateQueryFields(couponFieldsValidationConfig, "sort_by", sortBy);
  if (sortOrder)
    validateQueryFields(couponFieldsValidationConfig, "sort_order", sortOrder);

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
    for (const [key, value] of Object.entries(remainingQuery)) {
      validateQueryFields(couponFieldsValidationConfig, key, value);
      andConditions.push({
        [key]: value === "true" ? true : value === "false" ? false : value,
      });
    }
  }

  addFilter(andConditions, "discount_value", "gte", Number(minValue));
  addFilter(andConditions, "discount_value", "lte", Number(maxValue));

  const whereConditions = {
    AND: andConditions,
  };

  const [result, total] = await Promise.all([
    prisma.coupon.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy: {
        [sortWith]: sortSequence,
      },
    }),
    prisma.coupon.count({ where: whereConditions }),
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

const updateCouponActiveStatus = async () => {
  const now = new Date();

  // Deactivate expired coupons
  const updateExpiredCoupons = await prisma.coupon.updateMany({
    where: {
      is_active: true,
      OR: [
        {
          start_date: {
            gt: now,
          },
        },
        {
          expiration_date: {
            lt: now,
          },
        },
      ],
    },
    data: {
      is_active: false,
    },
  });
  console.log(`${updateExpiredCoupons.count} expired coupons deactivated`);

  // Activate coupons that are within the start and expiration date range
  const updateDiactiveCoupons = await prisma.coupon.updateMany({
    where: {
      is_active: false,
      start_date: {
        lte: now,
      },
      expiration_date: {
        gte: now,
      },
    },
    data: {
      is_active: true,
    },
  });
  console.log(`${updateDiactiveCoupons.count} diactive coupons activated`);
};

export const CouponServices = {
  createCoupon,
  getCoupons,
  updateCouponActiveStatus,
};
