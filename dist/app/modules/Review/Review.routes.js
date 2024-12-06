"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const Review_controllers_1 = require("./Review.controllers");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Review_validations_1 = require("./Review.validations");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.default)(client_1.UserRole.RETAILER, client_1.UserRole.USER), (0, validateRequest_1.default)(Review_validations_1.ReviewValidations.createReviewValidationSchema), Review_controllers_1.ReviewControllers.createReview);
router.get("/:product_id", Review_controllers_1.ReviewControllers.getReviewsByProductId);
exports.ReviewRoutes = router;
