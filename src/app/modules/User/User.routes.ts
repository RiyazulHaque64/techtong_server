import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserControllers } from "./User.controllers";
import validateFormData from "../../middlewares/validateFormData";
import { UserValidations } from "./User.validations";
import { fileUploader } from "../../utils/fileUploader";

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

export const UserRoutes = router;
