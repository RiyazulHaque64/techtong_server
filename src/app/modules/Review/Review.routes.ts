import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { ReviewControllers } from "./Review.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { ReviewValidations } from "./Review.validations";

const router = Router();

router.post(
  "/",
  auth(UserRole.RETAILER, UserRole.USER),
  validateRequest(ReviewValidations.createReviewValidationSchema),
  ReviewControllers.createReview
);

router.get("/:product_id", ReviewControllers.getReviewsByProductId);

export const ReviewRoutes = router;
