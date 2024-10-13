import { Request } from "express";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AuthServices } from "./Auth.services";

const createOTP = catchAsync(async (req, res, next) => {
  const result = await AuthServices.createOTP(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "OTP sent successful",
    data: result,
  });
});

const register = catchAsync(async (req, res, next) => {
  const result = await AuthServices.register(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registration is successful",
    data: result,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { accessToken, refreshToken } = await AuthServices.login(req.body);
  const maxAge = 60 * 24 * 60 * 60 * 1000;
  res.cookie("refreshToken", refreshToken, { maxAge, httpOnly: true });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login is successful",
    data: { accessToken },
  });
});

// const resetPassword = catchAsync(
//   async (req: Request & { user?: JwtPayload }, res, next) => {
//     const result = await AuthServices.resetPassword(req?.user, req.body);
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Password reset successfully",
//       data: result,
//     });
//   }
// );

export const AuthControllers = {
  createOTP,
  register,
  login,
};
