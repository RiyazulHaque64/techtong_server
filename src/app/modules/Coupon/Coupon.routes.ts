import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import { CouponControllers } from "./Coupon.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { CouponValidations } from "./Coupon.validations";

const router = Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  CouponControllers.getCoupons
);

router.post(
  "/create-coupon",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(CouponValidations.createCouponValidationSchema),
  CouponControllers.createCoupon
);

export const CouponRoutes = router;
