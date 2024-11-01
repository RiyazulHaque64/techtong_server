import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { AddressControllers } from "./Address.controllers";
import { AddressValidations } from "./Address.validations";

const router = Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.RETAILER, UserRole.USER),
  AddressControllers.getMyAddresses
);

router.get(
  "/all",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AddressControllers.getAllAddresses
);

router.post(
  "/add-address",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.RETAILER, UserRole.USER),
  validateRequest(AddressValidations.addAddressValidationSchema),
  AddressControllers.addAddress
);

router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.RETAILER, UserRole.USER),
  AddressControllers.getMySingleAddresses
);

router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.RETAILER, UserRole.USER),
  validateRequest(AddressValidations.updateAddressValidationSchema),
  AddressControllers.updateAddress
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.RETAILER, UserRole.USER),
  AddressControllers.deleteAddress
);

export const AddressRoutes = router;
