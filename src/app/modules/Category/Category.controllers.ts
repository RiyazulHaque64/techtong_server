import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { CategoryServices } from "./Category.services";

const addCategory = catchAsync(async (req, res, next) => {
  const result = await CategoryServices.addCategory(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully added the category",
    data: result,
  });
});

const getCategories = catchAsync(async (req, res, next) => {
  const result = await CategoryServices.getCategories(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved the categories",
    meta: result.meta,
    data: result.data,
  });
});

const getCategory = catchAsync(async (req, res, next) => {
  const result = await CategoryServices.getCategory(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved the category",
    data: result,
  });
});

const updateCategory = catchAsync(async (req, res, next) => {
  const result = await CategoryServices.updateCategory(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully updated the category",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req, res, next) => {
  const result = await CategoryServices.deleteCategory(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully deleted the category",
    data: result,
  });
});

export const CategoryControllers = {
  addCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
};
