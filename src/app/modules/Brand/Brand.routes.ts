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

export const BrandRoutes = router;
