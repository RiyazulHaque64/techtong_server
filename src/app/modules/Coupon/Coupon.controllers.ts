import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { CouponServices } from "./Coupon.services";
import { pick } from "../../utils/pick";
import { couponFilterableFields } from "./Coupon.constants";

const createCoupon = catchAsync(async (req, res, next) => {
  const result = await CouponServices.createCoupon(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully created the coupon",
    data: result,
  });
});

const getCoupons = catchAsync(async (req, res, next) => {
  const filteredQuery = pick(req.query, couponFilterableFields);
  const result = await CouponServices.getCoupons(filteredQuery);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved the coupons",
    meta: result.meta,
    data: result.data,
  });
});

export const CouponControllers = {
  createCoupon,
  getCoupons,
};
