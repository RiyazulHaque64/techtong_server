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

const getCart = catchAsync(
  async (req: Request & { user?: TAuthUser }, res, next) => {
    const result = await CartServices.getCart(req.user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cart retrieved successfully",
      data: result,
    });
  }
);

const deleteToCart = catchAsync(
  async (req: Request & { user?: TAuthUser }, res, next) => {
    const result = await CartServices.deleteToCart(
      req.user,
      req.params.cartItemId
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully removed the product from the cart",
      data: result,
    });
  }
);

export const CartControllers = {
  addToCart,
  getCart,
  deleteToCart,
};
