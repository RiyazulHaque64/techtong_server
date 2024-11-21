import {
  DeliveryMethod,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "@prisma/client";
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
      coupon_code: z
        .string({
          invalid_type_error: "Coupon code must be a text",
        })
        .min(1, "Coupon code should not empty string")
        .optional(),
      comment: z
        .string({ invalid_type_error: "Comment must be a text" })
        .optional(),
    })
    .strict(),
});

const createOrderForGuestUserValidationSchema = z.object({
  body: z
    .object({
      customer_information: z
        .object({
          name: z
            .string({
              required_error: "Name is required",
              invalid_type_error: "Name must be a text",
            })
            .min(1, "Name is required"),
          email: z.string().email({ message: "Invalid email" }).optional(),
          contact_number: z
            .string({ required_error: "Contact number is required" })
            .regex(/^01\d{9}$/, {
              message:
                "Contact number must be a valid Bangladeshi number like as 01511111111",
            }),
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
      order_items: z
        .array(
          z
            .object({
              product_id: z
                .string({
                  invalid_type_error: "Product id must be a text",
                })
                .regex(
                  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
                  "Invalid Product"
                ),
              quantity: z
                .number({ invalid_type_error: "Quantity must be a number" })
                .nonnegative({ message: "Quantity must be a positive number" })
                .optional(),
            })
            .strict()
        )
        .nonempty("Order items are required"),
      payment_method: z
        .enum(Object.values(PaymentMethod) as [string, ...string[]])
        .optional(),
      delivery_method: z
        .enum(Object.values(DeliveryMethod) as [string, ...string[]])
        .optional(),
      coupon_code: z
        .string({
          invalid_type_error: "Coupon code must be a text",
        })
        .min(1, "Coupon code should not empty string")
        .optional(),
      comment: z
        .string({ invalid_type_error: "Comment must be a text" })
        .optional(),
    })
    .strict(),
});

const updateOrderByAdminValidationSchema = z.object({
  body: z
    .object({
      delivery_method: z
        .enum(Object.values(DeliveryMethod) as [string, ...string[]])
        .optional(),
      payment_method: z
        .enum(Object.values(PaymentMethod) as [string, ...string[]])
        .optional(),
      order_status: z
        .enum(Object.values(OrderStatus) as [string, ...string[]])
        .optional(),
      payment_status: z
        .enum(Object.values(PaymentStatus) as [string, ...string[]])
        .optional(),
      comment: z
        .string({ invalid_type_error: "Comment must be a text" })
        .optional(),
    })
    .strict(),
});

const updateOrderByCustomerValidationSchema = z.object({
  body: z
    .object({
      payment_method: z
        .enum(Object.values(PaymentMethod) as [string, ...string[]])
        .optional(),
      delivery_method: z
        .enum(Object.values(DeliveryMethod) as [string, ...string[]])
        .optional(),
      comment: z
        .string({ invalid_type_error: "Comment must be a text" })
        .optional(),
      customer_information: z
        .object({
          name: z
            .string({
              invalid_type_error: "Name must be a text",
            })
            .min(1, "Name should not empty string")
            .optional(),
          email: z.string().email({ message: "Invalid email" }).optional(),
          contact_number: z
            .string()
            .regex(/^01\d{9}$/, {
              message:
                "Contact number must be a valid Bangladeshi number like as 01511111111",
            })
            .optional(),
          address: z
            .string({
              invalid_type_error: "Address must be a text",
            })
            .min(1, "Address should not empty string")
            .optional(),
          city: z
            .string({
              invalid_type_error: "City must be a text",
            })
            .min(1, "City should not empty string")
            .optional(),
        })
        .strict()
        .optional(),
    })
    .strict(),
});

export const OrderValidations = {
  createOrderForRegisteredUserValidationSchema,
  createOrderForGuestUserValidationSchema,
  updateOrderByAdminValidationSchema,
  updateOrderByCustomerValidationSchema,
};
