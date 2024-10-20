import { Request } from "express";
import catchAsync from "../../shared/catchAsync";
import { ProductServices } from "./Product.services";
import { TAuthUser } from "../../interfaces/common";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";

const addProduct = catchAsync(async (req, res, next) => {
  const result = await ProductServices.addProduct(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successflly added the product",
    data: result,
  });
});

export const ProductControllers = {
  addProduct,
};
