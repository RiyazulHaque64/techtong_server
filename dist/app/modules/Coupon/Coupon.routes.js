"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const Coupon_controllers_1 = require("./Coupon.controllers");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Coupon_validations_1 = require("./Coupon.validations");
const router = (0, express_1.Router)();
router.get("/", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), Coupon_controllers_1.CouponControllers.getCoupons);
router.post("/apply-coupon", (0, validateRequest_1.default)(Coupon_validations_1.CouponValidations.applyCouponValidationSchema), Coupon_controllers_1.CouponControllers.applyCoupon);
router.post("/create-coupon", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(Coupon_validations_1.CouponValidations.createCouponValidationSchema), Coupon_controllers_1.CouponControllers.createCoupon);
exports.CouponRoutes = router;
