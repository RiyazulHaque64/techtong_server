import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserControllers } from "./User.controllers";
import validateFormData from "../../middlewares/validateFormData";
import { UserValidations } from "./User.validations";
import { fileUploader } from "../../utils/fileUploader";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  UserControllers.getUsers
);

router.get(
  "/me",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.RETAILER, UserRole.USER),
  UserControllers.getMe
);

router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  UserControllers.getUser
);

router.patch(
  "/update-profile",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.RETAILER, UserRole.USER),
  fileUploader.singleUpload.single("profile_pic"),
  validateFormData(UserValidations.updateProfileValidationSchema),
  UserControllers.updateProfile
);

router.patch(
  "/update-role-status",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(UserValidations.updateUserRoleAndStatusValidationSchema),
  UserControllers.updateUserRoleAndStatus
);

router.delete(
  "/delete-user",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(UserValidations.deleteUserValidationSchema),
  UserControllers.deleteUser
);

export const UserRoutes = router;