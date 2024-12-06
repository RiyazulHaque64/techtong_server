"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Category_controllers_1 = require("./Category.controllers");
const Category_validations_1 = require("./Category.validations");
const router = (0, express_1.Router)();
router.get("/", Category_controllers_1.CategoryControllers.getCategories);
router.post("/add-category", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(Category_validations_1.CategoryValidations.addCategoryValidationSchema), Category_controllers_1.CategoryControllers.addCategory);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(Category_validations_1.CategoryValidations.updateCategoryValidationSchema), Category_controllers_1.CategoryControllers.updateCategory);
router.get("/:id", Category_controllers_1.CategoryControllers.getCategory);
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), Category_controllers_1.CategoryControllers.deleteCategory);
exports.CategoryRoutes = router;
