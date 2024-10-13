import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./Auth.controllers";
import { AuthValidations } from "./Auth.validations";
import { fileUploader } from "../../utils/fileUploader";
import validateFormData from "../../middlewares/validateFormData";

const router = Router();

router.post(
  "/send-otp",
  validateRequest(AuthValidations.createOTPValidationSchema),
  AuthControllers.createOTP
);

router.post(
  "/register",
  validateRequest(AuthValidations.registerValidationSchema),
  AuthControllers.register
);

router.post(
  "/login",
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.login
);

router.post(
  "/reset-password",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.RETAILER, UserRole.USER),
  validateRequest(AuthValidations.resetPasswordValidationSchema),
  AuthControllers.resetPassword
);

export const AuthRoutes = router;
