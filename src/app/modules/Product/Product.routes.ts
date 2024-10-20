import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import { ProductControllers } from "./Product.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidations } from "./Product.validations";

const router = Router();

router.post(
  "/add-product",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(ProductValidations.addProductValidationSchema),
  ProductControllers.addProduct
);

export const ProductRoutes = router;
