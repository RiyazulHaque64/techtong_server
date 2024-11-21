import { BeneficiaryType, DiscountType, Prisma } from "@prisma/client";
import prisma from "../../shared/prisma";
import pagination from "../../utils/pagination";
import {
  couponFieldsValidationConfig,
  couponSearchableFields,
} from "./Coupon.constants";
import {
  TApplyCouponPayload,
  TApplyCouponResponse,
  TCouponPayload,
} from "./Coupon.interfaces";
import addFilter from "../../utils/addFilter";
import validateQueryFields from "../../utils/validateQueryFields";
import httpStatus from "http-status";
import ApiError from "../../error/ApiError";

const createCoupon = async (payload: TCouponPayload) => {
  const { start_date, expiration_date, ...remainingField } = payload;

  const modified_start_date = start_date ? new Date(start_date) : new Date();
  const modified_expiration_date = new Date(expiration_date);

  if (modified_start_date > modified_expiration_date) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Start date cannot be greater than expiration date"
    );
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

const applyCoupon = async (
  payload: TApplyCouponPayload
): Promise<TApplyCouponResponse> => {
  const {
    code,
    contact_number,
    order_amount,
    product_amount,
    customer_type = "GUEST",
  } = payload;
  const coupon = await prisma.coupon.findUnique({
    where: {
      code,
    },
  });

  // Check if the coupon exists
  if (!coupon || !coupon.is_active) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid or inactive coupon");
  }

  // Check if the coupon is valid for this user
  if (
    coupon.beneficiary_type === BeneficiaryType.NEW_USER &&
    customer_type !== "NEW"
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "This coupon is only valid for new users"
    );
  }
  if (
    coupon.beneficiary_type === BeneficiaryType.EXISTING_USER &&
    customer_type === "GUEST"
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "This coupon is only valid for registered users"
    );
  }

  // Check if the coupon is valid for this time period
  if (
    coupon.start_date.toISOString() > new Date().toISOString() ||
    coupon.expiration_date.toISOString() < new Date().toISOString()
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Coupon is not valid for this time period"
    );
  }

  // Check if the coupon usage limit has been reached
  if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Coupon usage limit exceeded");
  }

  // Check if the order amount meet the minimum requirements
  if (coupon.min_order_amount && order_amount < coupon.min_order_amount) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `To apply this coupon, the order amount must be at least ${coupon.min_order_amount}`
    );
  }

  // Check if the product amount meet the minimum requirements
  if (coupon.min_product_amount && product_amount < coupon.min_product_amount) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `To apply this coupon, you must buy at least ${coupon.min_product_amount} products`
    );
  }

  // Check if the per user limit has been reached
  if (coupon.per_user_limit) {
    const customerInfo = await prisma.customerInfo.findMany({
      where: {
        contact_number,
        coupon: {
          code,
        },
      },
    });
    if (customerInfo?.length >= coupon.per_user_limit) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "You have already used this coupon the maximum allowed times"
      );
    }
  }

  let discount_amount = 0;

  if (coupon.discount_type === DiscountType.AMOUNT) {
    discount_amount = Math.min(
      coupon.discount_value,
      coupon.maximum_value || coupon.discount_value
    );
  } else if (coupon.discount_type === DiscountType.PERCENTAGE) {
    discount_amount = Math.min(
      order_amount * (coupon.discount_value / 100),
      coupon.maximum_value || order_amount * (coupon.discount_value / 100)
    );
  }

  return {
    id: coupon.id,
    code: coupon.code,
    discount_amount,
  };
};

export const CouponServices = {
  createCoupon,
  getCoupons,
  updateCouponActiveStatus,
  applyCoupon,
};
