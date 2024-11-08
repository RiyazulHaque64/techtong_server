import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { OrderServices } from "./Order.services";
import { Request } from "express";
import { TAuthUser } from "../../interfaces/common";

const createOrderForRegisteredUser = catchAsync(
  async (req: Request & { user?: TAuthUser }, res, next) => {
    const result = await OrderServices.createOrderForRegisteredUser(
      req.user,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Order created successfully",
      data: result,
    });
  }
);

export const OrderControllers = {
  createOrderForRegisteredUser,
};
