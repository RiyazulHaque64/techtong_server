import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { AttributeControllers } from "./Attribute.controllers";
import { AttributeValidations } from "./Attribute.validations";

const router = Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AttributeControllers.getAttributes
);
router.post(
  "/add-attribute",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(AttributeValidations.addAttributeValidationSchema),
  AttributeControllers.addAttribute
);
router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(AttributeValidations.updateAttributeValidationSchema),
  AttributeControllers.updateAttribute
);
router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AttributeControllers.getAttribute
);
router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AttributeControllers.deleteAttribute
);

export const AttributeRoutes = router;
