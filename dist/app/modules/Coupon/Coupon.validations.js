"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponValidations = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createCouponValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        code: zod_1.z
            .string({
            required_error: "Coupon code is required",
            invalid_type_error: "Coupon code must be a text",
        })
            .min(1, "Coupon code must be required"),
        discount_type: zod_1.z
            .enum(Object.values(client_1.DiscountType))
            .optional(),
        discount_value: zod_1.z
            .number({
            required_error: "Discount value is required",
            invalid_type_error: "Discount value must be a number",
        })
            .refine((value) => value > 0, {
            message: "Discount value must be a positive number",
        }),
        maximum_value: zod_1.z
            .number({
            invalid_type_error: "Maximum value must be a number",
        })
            .refine((value) => value > 0, {
            message: "Maximum value must be a positive number",
        })
            .optional(),
        start_date: zod_1.z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, "Start date must be in the format YYYY-MM-DD")
            .refine((value) => new Date(value).toISOString() >= new Date().toISOString(), "Date must be present or in the future")
            .transform((value) => new Date(value).toISOString())
            .optional(),
        expiration_date: zod_1.z
            .string({
            required_error: "Expiration date is required",
        })
            .regex(/^\d{4}-\d{2}-\d{2}$/, "Expiration date must be in the format YYYY-MM-DD")
            .refine((value) => new Date(value) > new Date(), "Date must be in the future")
            .transform((value) => new Date(value).toISOString()),
        usage_limit: zod_1.z
            .number({
            invalid_type_error: "Usage limit must be a number",
        })
            .refine((value) => value > 0, {
            message: "Usage limit must be a positive number",
        })
            .optional(),
        per_user_limit: zod_1.z
            .number({
            invalid_type_error: "Per user limit must be a number",
        })
            .refine((value) => value > 0, {
            message: "Per user limit must be a positive number",
        })
            .optional(),
        min_order_amount: zod_1.z
            .number({
            invalid_type_error: "Minimum order amount must be a number",
        })
            .refine((value) => value > 0, {
            message: "Minimum order amount must be a positive number",
        })
            .optional(),
        min_product_amount: zod_1.z
            .number({
            invalid_type_error: "Minimum product amount must be a number",
        })
            .refine((value) => value > 0, {
            message: "Minimum product amount must be a positive number",
        })
            .optional(),
        beneficiary_type: zod_1.z
            .enum(Object.values(client_1.BeneficiaryType))
            .optional(),
    })
        .strict(),
});
const applyCouponValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        code: zod_1.z
            .string({
            required_error: "Coupon code is required",
            invalid_type_error: "Coupon code must be a text",
        })
            .min(1, "Coupon code must be required"),
        contact_number: zod_1.z
            .string({ required_error: "Contact number is required" })
            .regex(/^01\d{9}$/, {
            message: "Contact number must be a valid Bangladeshi number like as 01511111111",
        }),
        order_amount: zod_1.z.number({
            required_error: "Order amount is required",
            invalid_type_error: "Order amount must be a number",
        }),
        product_amount: zod_1.z.number({
            required_error: "Product amount is required",
            invalid_type_error: "Product amount must be a number",
        }),
        customer_type: zod_1.z.enum(["GUEST", "NEW", "EXISTING"]).optional(),
    })
        .strict(),
});
exports.CouponValidations = {
    createCouponValidationSchema,
    applyCouponValidationSchema,
};
