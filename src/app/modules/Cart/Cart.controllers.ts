import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { CartServices } from "./Cart.services";
import { Request } from "express";
import { TAuthUser } from "../../interfaces/common";

const addToCart = catchAsync(
  async (req: Request & { user?: TAuthUser }, res, next) => {
    const result = await CartServices.addToCart(req.user, req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Product added to cart successfully",
      data: result,
    });
  }
);

export const CartControllers = {
  addToCart,
};
