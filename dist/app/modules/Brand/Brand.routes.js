"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Brand_controllers_1 = require("./Brand.controllers");
const Brand_validations_1 = require("./Brand.validations");
const router = (0, express_1.Router)();
router.get("/", Brand_controllers_1.BrandControllers.getBrands);
router.post("/add-brand", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(Brand_validations_1.BrandValidations.addBrandValidationSchema), Brand_controllers_1.BrandControllers.addBrand);
router.get("/:id", Brand_controllers_1.BrandControllers.getBrand);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(Brand_validations_1.BrandValidations.updateBrandValidationSchema), Brand_controllers_1.BrandControllers.updateBrand);
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), Brand_controllers_1.BrandControllers.deleteBrand);
exports.BrandRoutes = router;
