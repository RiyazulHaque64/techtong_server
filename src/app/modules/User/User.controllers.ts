import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { UserServices } from "./User.services";
import { pick } from "../../utils/pick";
import { userFilterableFields } from "./User.constants";
import { Request } from "express";
import { TAuthUser } from "../../interfaces/common";

const getUsers = catchAsync(async (req, res, next) => {
  const filteredQuery = pick(req.query, userFilterableFields);
  const result = await UserServices.getUsers(filteredQuery);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved are successful",
    data: result,
  });
});

const getUser = catchAsync(async (req, res, next) => {
  const result = await UserServices.getUser(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved is successful",
    data: result,
  });
});

const getMe = catchAsync(
  async (req: Request & { user?: TAuthUser }, res, next) => {
    const result = await UserServices.getMe(req.user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Profile retrieved is successful",
      data: result,
    });
  }
);

const updateProfile = catchAsync(
  async (req: Request & { user?: TAuthUser }, res, next) => {
    const result = await UserServices.updateProfile(
      req.user,
      req.body,
      req.file
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Profile retrieved is successful",
      data: result,
    });
  }
);

const updateUserRoleAndStatus = catchAsync(
  async (req: Request & { user?: TAuthUser }, res, next) => {
    const result = await UserServices.updateUserRoleAndStatus(
      req.user,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully updated the user",
      data: result,
    });
  }
);

const deleteUser = catchAsync(
  async (req: Request & { user?: TAuthUser }, res, next) => {
    const result = await UserServices.deleteUser(req.user, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully deleted the user",
      data: result,
    });
  }
);

export const UserControllers = {
  getUsers,
  getUser,
  getMe,
  updateProfile,
  updateUserRoleAndStatus,
  deleteUser,
};
