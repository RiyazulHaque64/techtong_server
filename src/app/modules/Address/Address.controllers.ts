import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AddressServices } from "./Address.services";

const addAddress = catchAsync(async (req, res, next) => {
  const result = await AddressServices.addAddress(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully added the address",
    data: result,
  });
});

export const AddressControllers = {
  addAddress,
};
