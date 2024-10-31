import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { AddressControllers } from "./Address.controllers";
import { AddressValidations } from "./Address.validations";

const router = Router();

router.post(
  "/add-address",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.RETAILER, UserRole.USER),
  validateRequest(AddressValidations.addAddressValidationSchema),
  AddressControllers.addAddress
);

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AddressControllers.getAddresses
);

export const AddressRoutes = router;
