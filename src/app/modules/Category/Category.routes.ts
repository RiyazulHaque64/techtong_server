import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryControllers } from "./Category.controllers";
import { CategoryValidations } from "./Category.validations";

const router = Router();

router.get("/", CategoryControllers.getCategories);
router.post(
  "/add-category",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(CategoryValidations.addCategoryValidationSchema),
  CategoryControllers.addCategory
);
router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(CategoryValidations.updateCategoryValidationSchema),
  CategoryControllers.updateCategory
);
router.get("/:id", CategoryControllers.getCategory);
router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  CategoryControllers.deleteCategory
);

export const CategoryRoutes = router;
