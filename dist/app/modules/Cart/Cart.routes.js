"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Cart_controllers_1 = require("./Cart.controllers");
const Cart_validations_1 = require("./Cart.validations");
const router = (0, express_1.Router)();
router.get("/", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.RETAILER, client_1.UserRole.USER), Cart_controllers_1.CartControllers.getCart);
router.post("/add-to-cart", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.RETAILER, client_1.UserRole.USER), (0, validateRequest_1.default)(Cart_validations_1.CartValidations.addToCartValidationSchema), Cart_controllers_1.CartControllers.addToCart);
router.patch("/update/:cartItemId", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.RETAILER, client_1.UserRole.USER), (0, validateRequest_1.default)(Cart_validations_1.CartValidations.updateCartItemValidationSchema), Cart_controllers_1.CartControllers.updateCartItem);
router.delete("/:cartItemId", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.RETAILER, client_1.UserRole.USER), Cart_controllers_1.CartControllers.deleteToCart);
exports.CartRoutes = router;
