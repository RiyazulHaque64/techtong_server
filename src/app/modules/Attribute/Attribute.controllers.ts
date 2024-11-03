import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AttributeServices } from "./Attribute.services";

const addAttribute = catchAsync(async (req, res, next) => {
  const result = await AttributeServices.addAttribute(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully added the attribute",
    data: result,
  });
});

const getAttributes = catchAsync(async (req, res, next) => {
  const result = await AttributeServices.getAttributes(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved the attributes",
    data: result,
  });
});

const getAttribute = catchAsync(async (req, res, next) => {
  const result = await AttributeServices.getAttribute(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrieved the attribute",
    data: result,
  });
});

const updateAttribute = catchAsync(async (req, res, next) => {
  const result = await AttributeServices.updateAttribute(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully updated the attribute",
    data: result,
  });
});

const deleteAttribute = catchAsync(async (req, res, next) => {
  const result = await AttributeServices.deleteAttribute(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully deleted the attribute",
    data: result,
  });
});

export const AttributeControllers = {
  addAttribute,
  getAttributes,
  getAttribute,
  updateAttribute,
  deleteAttribute,
};
