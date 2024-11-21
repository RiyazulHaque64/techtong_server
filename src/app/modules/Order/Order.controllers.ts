import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { OrderServices } from "./Order.services";
import { Request } from "express";
import { TAuthUser } from "../../interfaces/common";
import { pick } from "../../utils/pick";
import { orderFilterableFields } from "./Order.constants";

const createOrderForRegisteredUser = catchAsync(
  async (req: Request & { user?: TAuthUser }, res, next) => {
    const result = await OrderServices.createOrderForRegisteredUser(
      req.user,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Order created successfully",
      data: result,
    });
  }
);

const createOrderForGuestUser = catchAsync(async (req: Request, res, next) => {
  const result = await OrderServices.createOrderForGuestUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Order created successfully",
    data: result,
  });
});

const getOrders = catchAsync(async (req: Request, res, next) => {
  const filteredQuery = pick(req.query, orderFilterableFields);
  const result = await OrderServices.getOrders(filteredQuery);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const myOrder = catchAsync(
  async (req: Request & { user?: TAuthUser }, res, next) => {
    const filteredQuery = pick(req.query, orderFilterableFields);
    const result = await OrderServices.myOrder(req.user, filteredQuery);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Your orders retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const updateOrderByAdmin = catchAsync(async (req, res, next) => {
  const result = await OrderServices.updateOrderByAdmin(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order updated successfully",
    data: result,
  });
});

export const OrderControllers = {
  createOrderForRegisteredUser,
  createOrderForGuestUser,
  getOrders,
  myOrder,
  updateOrderByAdmin,
};
