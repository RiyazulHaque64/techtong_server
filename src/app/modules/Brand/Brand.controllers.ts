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
    data: result,
  });
});

export const BrandControllers = {
  addBrand,
  getBrands,
};
