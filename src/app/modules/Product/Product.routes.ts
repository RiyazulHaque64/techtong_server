import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import { ProductControllers } from "./Product.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidations } from "./Product.validations";

const router = Router();

router.get("/", ProductControllers.getProducts);

router.post(
  "/add-product",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(ProductValidations.addProductValidationSchema),
  ProductControllers.addProduct
);

router.patch(
  "/update-product/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(ProductValidations.updateProductValidationSchema),
  ProductControllers.updateProduct
);

router.get("/:id", ProductControllers.getSingleProduct);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  ProductControllers.deleteProduct
);

export const ProductRoutes = router;
