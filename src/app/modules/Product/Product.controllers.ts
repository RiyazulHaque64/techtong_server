import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ProductServices } from "./Product.services";

const addProduct = catchAsync(async (req, res, next) => {
  const result = await ProductServices.addProduct(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully added the product",
    data: result,
  });
});

const getProducts = catchAsync(async (req, res, next) => {
  const result = await ProductServices.getProducts(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products have been successfully retrieved",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleProduct = catchAsync(async (req, res, next) => {
  const result = await ProductServices.getSingleProduct(req.params.slug);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product has been successfully retrieved",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const result = await ProductServices.updateProduct(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully updated the product",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const result = await ProductServices.deleteProduct(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully deleted the product",
    data: result,
  });
});

export const ProductControllers = {
  addProduct,
  updateProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
};
