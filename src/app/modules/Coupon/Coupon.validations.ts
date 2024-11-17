import { BeneficiaryType, DiscountType } from "@prisma/client";
import { z } from "zod";

const createCouponValidationSchema = z.object({
  body: z
    .object({
      code: z
        .string({
          required_error: "Coupon code is required",
          invalid_type_error: "Coupon code must be a text",
        })
        .min(1, "Coupon code must be required"),
      discount_type: z
        .enum(Object.values(DiscountType) as [string, ...string[]])
        .optional(),
      discount_value: z
        .number({
          required_error: "Discount value is required",
          invalid_type_error: "Discount value must be a number",
        })
        .refine((value) => value > 0, {
          message: "Discount value must be a positive number",
        }),
      maximum_value: z
        .number({
          invalid_type_error: "Maximum value must be a number",
        })
        .refine((value) => value > 0, {
          message: "Maximum value must be a positive number",
        })
        .optional(),
      start_date: z
        .string()
        .regex(
          /^\d{4}-\d{2}-\d{2}$/,
          "Start date must be in the format YYYY-MM-DD"
        )
        .refine(
          (value) => new Date(value).toISOString() >= new Date().toISOString(),
          "Date must be present or in the future"
        )
        .transform((value) => new Date(value).toISOString())
        .optional(),
      expiration_date: z
        .string({
          required_error: "Expiration date is required",
        })
        .regex(
          /^\d{4}-\d{2}-\d{2}$/,
          "Expiration date must be in the format YYYY-MM-DD"
        )
        .refine(
          (value) => new Date(value) > new Date(),
          "Date must be in the future"
        )
        .transform((value) => new Date(value).toISOString()),
      usage_limit: z
        .number({
          invalid_type_error: "Usage limit must be a number",
        })
        .refine((value) => value > 0, {
          message: "Usage limit must be a positive number",
        })
        .optional(),
      per_user_limit: z
        .number({
          invalid_type_error: "Per user limit must be a number",
        })
        .refine((value) => value > 0, {
          message: "Per user limit must be a positive number",
        })
        .optional(),
      min_order_amount: z
        .number({
          invalid_type_error: "Minimum order amount must be a number",
        })
        .refine((value) => value > 0, {
          message: "Minimum order amount must be a positive number",
        })
        .optional(),
      min_product_amount: z
        .number({
          invalid_type_error: "Minimum product amount must be a number",
        })
        .refine((value) => value > 0, {
          message: "Minimum product amount must be a positive number",
        })
        .optional(),
      beneficiary_type: z
        .enum(Object.values(BeneficiaryType) as [string, ...string[]])
        .optional(),
    })
    .strict(),
});

const applyCouponValidationSchema = z.object({
  body: z
    .object({
      code: z
        .string({
          required_error: "Coupon code is required",
          invalid_type_error: "Coupon code must be a text",
        })
        .min(1, "Coupon code must be required"),
      contact_number: z
        .string({ required_error: "Contact number is required" })
        .regex(/^01\d{9}$/, {
          message:
            "Contact number must be a valid Bangladeshi number like as 01511111111",
        }),
      order_amount: z.number({
        required_error: "Order amount is required",
        invalid_type_error: "Order amount must be a number",
      }),
      product_amount: z.number({
        required_error: "Product amount is required",
        invalid_type_error: "Product amount must be a number",
      }),
      customer_type: z.enum(["GUEST", "NEW", "EXISTING"]).optional(),
    })
    .strict(),
});

export const CouponValidations = {
  createCouponValidationSchema,
  applyCouponValidationSchema,
};
