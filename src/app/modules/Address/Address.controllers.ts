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

const getAddresses = catchAsync(async (req, res, next) => {
  const filteredQuery = pick(req.query, addressFilterableFields);
  const result = await AddressServices.getAddresses(filteredQuery);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All addresses have been successfully retrieved",
    data: result,
  });
});

export const AddressControllers = {
  addAddress,
  getAddresses,
};
