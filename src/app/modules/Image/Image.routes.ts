import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import { ImageControllers } from "./Image.controllers";
import { fileUploader } from "../../utils/fileUploader";

const router = Router();

router.post(
  "/upload-images",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploader.multipleUpload,
  ImageControllers.uploadImages
);

router.delete(
  "/delete-images",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  ImageControllers.deleteImages
);

export const ImageRoutes = router;
