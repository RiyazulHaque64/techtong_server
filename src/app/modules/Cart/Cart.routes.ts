import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { CartControllers } from "./Cart.controllers";
import { CartValidations } from "./Cart.validations";

const router = Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.RETAILER, UserRole.USER),
  CartControllers.getCart
);

router.post(
  "/add-to-cart",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.RETAILER, UserRole.USER),
  validateRequest(CartValidations.addToCartValidationSchema),
  CartControllers.addToCart
);

export const CartRoutes = router;
