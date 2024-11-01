import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AddressServices } from "./Address.services";
import { Request } from "express";
import { TAuthUser } from "../../interfaces/common";
import { pick } from "../../utils/pick";
import { addressFilterableFields } from "./Address.constants";

const addAddress = catchAsync(
  async (req: Request & { user?: TAuthUser }, res, next) => {
    const result = await AddressServices.addAddress(req.user, req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Successfully added the address",
      data: result,
    });
  }
);

const getAllAddresses = catchAsync(async (req, res, next) => {
  const filteredQuery = pick(req.query, addressFilterableFields);
  const result = await AddressServices.getAllAddresses(filteredQuery);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All addresses have been successfully retrieved",
    data: result,
  });
});

const getMyAddresses = catchAsync(
  async (req: Request & { user?: TAuthUser }, res, next) => {
    const filteredQuery = pick(req.query, addressFilterableFields);
    const result = await AddressServices.getMyAddresses(
      req.user,
      filteredQuery
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Your addresses have been successfully retrieved",
      data: result,
    });
  }
);

const getMySingleAddresses = catchAsync(
  async (req: Request & { user?: TAuthUser }, res, next) => {
    const result = await AddressServices.getMySingleAddress(
      req.user,
      req.params.id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Your address has been successfully retrieved",
      data: result,
    });
  }
);

const updateAddress = catchAsync(
  async (req: Request & { user?: TAuthUser }, res, next) => {
    const result = await AddressServices.updateAddress(
      req.user,
      req.params.id,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Your address has been successfully updated",
      data: result,
    });
  }
);

const deleteAddress = catchAsync(
  async (req: Request & { user?: TAuthUser }, res, next) => {
    const result = await AddressServices.deleteAddress(req.user, req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Your address has been successfully deleted",
      data: result,
    });
  }
);

export const AddressControllers = {
  addAddress,
  getAllAddresses,
  getMyAddresses,
  getMySingleAddresses,
  updateAddress,
  deleteAddress,
};
