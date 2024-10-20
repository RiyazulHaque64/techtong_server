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

export const CategoryControllers = {
  addCategory,
};
