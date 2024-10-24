import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { CategoryServices } from "./Category.services";

const addCategory = catchAsync(async (req, res, next) => {
  const result = await CategoryServices.addCategory(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successflly added the category",
    data: result,
  });
});

const getCategories = catchAsync(async (req, res, next) => {
  const result = await CategoryServices.getCategories(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successflly retrieved the categories",
    data: result,
  });
});

export const CategoryControllers = {
  addCategory,
  getCategories,
};
