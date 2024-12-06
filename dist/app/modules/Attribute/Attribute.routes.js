"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Attribute_controllers_1 = require("./Attribute.controllers");
const Attribute_validations_1 = require("./Attribute.validations");
const router = (0, express_1.Router)();
router.get("/", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), Attribute_controllers_1.AttributeControllers.getAttributes);
router.post("/add-attribute", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(Attribute_validations_1.AttributeValidations.addAttributeValidationSchema), Attribute_controllers_1.AttributeControllers.addAttribute);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(Attribute_validations_1.AttributeValidations.updateAttributeValidationSchema), Attribute_controllers_1.AttributeControllers.updateAttribute);
router.get("/:id", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), Attribute_controllers_1.AttributeControllers.getAttribute);
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), Attribute_controllers_1.AttributeControllers.deleteAttribute);
exports.AttributeRoutes = router;
