"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const Product_controllers_1 = require("./Product.controllers");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Product_validations_1 = require("./Product.validations");
const router = (0, express_1.Router)();
router.get("/", Product_controllers_1.ProductControllers.getProducts);
router.post("/add-product", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(Product_validations_1.ProductValidations.addProductValidationSchema), Product_controllers_1.ProductControllers.addProduct);
router.patch("/update-product/:id", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(Product_validations_1.ProductValidations.updateProductValidationSchema), Product_controllers_1.ProductControllers.updateProduct);
router.get("/:id", Product_controllers_1.ProductControllers.getSingleProduct);
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), Product_controllers_1.ProductControllers.deleteProduct);
exports.ProductRoutes = router;
