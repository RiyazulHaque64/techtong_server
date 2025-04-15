import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { CourierServices } from "./Courier.services";

const addCourier = catchAsync(async (req, res, next) => {
    const result = await CourierServices.addCourier(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Successfully added the courier",
        data: result,
    });
});

const getCouriers = catchAsync(async (req, res, next) => {
    const result = await CourierServices.getCouriers(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully retrieved the couriers",
        meta: result.meta,
        data: result.data,
    });
});

const updateCourier = catchAsync(async (req, res, next) => {
    const result = await CourierServices.updateCourier(req.params.id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully updated the courier",
        data: result,
    });
});

const deleteCouriers = catchAsync(async (req, res, next) => {
    const result = await CourierServices.deleteCouriers(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully deleted the couriers",
        data: result,
    });
});

export const CourierControllers = {
    addCourier,
    getCouriers,
    updateCourier,
    deleteCouriers
};
