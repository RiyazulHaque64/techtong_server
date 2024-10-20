import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ImageServices } from "./Image.services";

const uploadImages = catchAsync(async (req, res, next) => {
  const result = await ImageServices.uploadImages(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successflly uploaded the images",
    data: result,
  });
});

const deleteImages = catchAsync(async (req, res, next) => {
  const result = await ImageServices.deleteImages(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successflly deleted the images",
    data: result,
  });
});

export const ImageControllers = {
  uploadImages,
  deleteImages,
};
