import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { BrandControllers } from "./Brand.controllers";
import { BrandValidations } from "./Brand.validations";

const router = Router();

router.get("/", BrandControllers.getBrands);
router.post(
  "/add-brand",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(BrandValidations.addBrandValidationSchema),
  BrandControllers.addBrand
);
router.get("/:id", BrandControllers.getBrand);
router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(BrandValidations.updateBrandValidationSchema),
  BrandControllers.updateBrand
);
router.delete(
  "/delete-brand",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(BrandValidations.deleteBrandsValidationSchema),
  BrandControllers.deleteBrand
);

export const BrandRoutes = router;
