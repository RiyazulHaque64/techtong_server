import { DeliveryMethod, PaymentMethod } from "@prisma/client";
import { z } from "zod";

const createOrderForRegisteredUserValidationSchema = z.object({
  body: z
    .object({
      customer_information: z
        .object({
          name: z
            .string({
              required_error: "Name is required",
              invalid_type_error: "Name must be a text",
            })
            .min(1, "Name is required")
            .optional(),
          email: z.string().email({ message: "Invalid email" }).optional(),
          contact_number: z
            .string({ required_error: "Contact number is required" })
            .regex(/^01\d{9}$/, {
              message:
                "Contact number must be a valid Bangladeshi number like as 01511111111",
            })
            .optional(),
          address: z
            .string({
              invalid_type_error: "Address must be a text",
            })
            .min(1, "Address is required"),
          city: z
            .string({
              invalid_type_error: "City must be a text",
            })
            .min(1, "City is required"),
        })
        .strict(),
      payment_method: z
        .enum(Object.values(PaymentMethod) as [string, ...string[]])
        .optional(),
      delivery_method: z
        .enum(Object.values(DeliveryMethod) as [string, ...string[]])
        .optional(),
      coupon_id: z
        .string({
          invalid_type_error: "Coupon id must be a text",
        })
        .regex(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
          "Invalid Coupon"
        )
        .optional(),
      comment: z
        .string({ invalid_type_error: "Comment must be a text" })
        .optional(),
    })
    .strict(),
});

export const OrderValidations = {
  createOrderForRegisteredUserValidationSchema,
};