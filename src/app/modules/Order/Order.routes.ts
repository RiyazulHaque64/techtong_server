import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { OrderControllers } from "./Order.controllers";
import { OrderValidations } from "./Order.validations";

const router = Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  OrderControllers.getOrders
);

router.get(
  "/my-order",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.RETAILER, UserRole.USER),
  OrderControllers.myOrder
);

router.post(
  "/create-order",
  validateRequest(OrderValidations.createOrderForGuestUserValidationSchema),
  OrderControllers.createOrderForGuestUser
);

router.post(
  "/create-order-for-user",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.RETAILER, UserRole.USER),
  validateRequest(
    OrderValidations.createOrderForRegisteredUserValidationSchema
  ),
  OrderControllers.createOrderForRegisteredUser
);

router.delete(
  "/delete-order",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(OrderValidations.deleteOrdersValidationSchema),
  OrderControllers.deleteOrders
);

router.patch(
  "/admin/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(OrderValidations.updateOrderByAdminValidationSchema),
  OrderControllers.updateOrderByAdmin
);

router.get(
  "/:orderID",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  OrderControllers.getOrderByAdmin
);

router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.RETAILER, UserRole.USER),
  validateRequest(OrderValidations.updateOrderByCustomerValidationSchema),
  OrderControllers.updateOrderByCustomer
);

export const OrderRoutes = router;
