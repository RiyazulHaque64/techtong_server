import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { BrandServices } from "./Brand.services";

const addBrand = catchAsync(async (req, res, next) => {
  const result = await BrandServices.addBrand(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully added the brand",
    data: result,
  });
});

const getBrands = catchAsync(async (req, res, next) => {
  const result = await BrandServices.getBrands(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved the brands",
    meta: result.meta,
    data: result.data,
  });
});

const getBrand = catchAsync(async (req, res, next) => {
  const result = await BrandServices.getBrand(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved the brand",
    data: result,
  });
});

const updateBrand = catchAsync(async (req, res, next) => {
  const result = await BrandServices.updateBrand(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully updated the brand",
    data: result,
  });
});

const deleteBrand = catchAsync(async (req, res, next) => {
  const result = await BrandServices.deleteBrand(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully deleted the brand",
    data: result,
  });
});

export const BrandControllers = {
  addBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
};
