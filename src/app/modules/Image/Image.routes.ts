import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import { ImageControllers } from "./Image.controllers";
import { fileUploader } from "../../utils/fileUploader";
import { ImageValidations } from "./Image.validations";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  ImageControllers.getImages
);

router.post(
  "/upload-images",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploader.multipleUpload,
  ImageControllers.uploadImages
);

router.delete(
  "/delete-images",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(ImageValidations.deleteImagesValidationSchema),
  ImageControllers.deleteImages
);

router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  ImageControllers.getImage
);

export const ImageRoutes = router;
