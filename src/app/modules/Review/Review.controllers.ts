import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ReviewServices } from "./Review.services";
import { Request } from "express";
import { TAuthUser } from "../../interfaces/common";

const createReview = catchAsync(
  async (req: Request & { user?: TAuthUser }, res, next) => {
    const result = await ReviewServices.createReview(req.user, req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Review provided successfully",
      data: result,
    });
  }
);

const getReviewsByProductId = catchAsync(async (req, res, next) => {
  const result = await ReviewServices.getReviewsByProductId(
    req.params.product_id,
    req.query
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const ReviewControllers = {
  createReview,
  getReviewsByProductId,
};
