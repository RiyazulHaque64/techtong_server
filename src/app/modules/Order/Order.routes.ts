import { Router } from "express";
import { OrderControllers } from "./Order.controllers";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { OrderValidations } from "./Order.validations";

const router = Router();

router.post(
  "/create-order-for-user",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.RETAILER, UserRole.USER),
  validateRequest(
    OrderValidations.createOrderForRegisteredUserValidationSchema
  ),
  OrderControllers.createOrderForRegisteredUser
);

export const OrderRoutes = router;