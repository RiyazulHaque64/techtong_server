import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { CourierControllers } from "./Courier.controllers";
import { CourierValidations } from "./Courier.validations";

const router = Router();

router.get("/", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), CourierControllers.getCouriers);
router.post(
    "/add-courier",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    validateRequest(CourierValidations.addCourierValidationSchema),
    CourierControllers.addCourier
);
router.delete(
    "/delete-courier",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    validateRequest(CourierValidations.deleteCouriersValidationSchema),
    CourierControllers.deleteCouriers
);
router.patch(
    "/:id",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    validateRequest(CourierValidations.updateCourierValidationSchema),
    CourierControllers.updateCourier
);

export const CourierRoutes = router;
