"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidations = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createOrderForRegisteredUserValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        customer_information: zod_1.z
            .object({
            name: zod_1.z
                .string({
                required_error: "Name is required",
                invalid_type_error: "Name must be a text",
            })
                .min(1, "Name is required")
                .optional(),
            email: zod_1.z.string().email({ message: "Invalid email" }).optional(),
            contact_number: zod_1.z
                .string({ required_error: "Contact number is required" })
                .regex(/^01\d{9}$/, {
                message: "Contact number must be a valid Bangladeshi number like as 01511111111",
            })
                .optional(),
            address: zod_1.z
                .string({
                invalid_type_error: "Address must be a text",
            })
                .min(1, "Address is required"),
            city: zod_1.z
                .string({
                invalid_type_error: "City must be a text",
            })
                .min(1, "City is required"),
        })
            .strict(),
        payment_method: zod_1.z
            .enum(Object.values(client_1.PaymentMethod))
            .optional(),
        delivery_method: zod_1.z
            .enum(Object.values(client_1.DeliveryMethod))
            .optional(),
        coupon_code: zod_1.z
            .string({
            invalid_type_error: "Coupon code must be a text",
        })
            .min(1, "Coupon code should not empty string")
            .optional(),
        comment: zod_1.z
            .string({ invalid_type_error: "Comment must be a text" })
            .optional(),
    })
        .strict(),
});
const createOrderForGuestUserValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        customer_information: zod_1.z
            .object({
            name: zod_1.z
                .string({
                required_error: "Name is required",
                invalid_type_error: "Name must be a text",
            })
                .min(1, "Name is required"),
            email: zod_1.z.string().email({ message: "Invalid email" }).optional(),
            contact_number: zod_1.z
                .string({ required_error: "Contact number is required" })
                .regex(/^01\d{9}$/, {
                message: "Contact number must be a valid Bangladeshi number like as 01511111111",
            }),
            address: zod_1.z
                .string({
                invalid_type_error: "Address must be a text",
            })
                .min(1, "Address is required"),
            city: zod_1.z
                .string({
                invalid_type_error: "City must be a text",
            })
                .min(1, "City is required"),
        })
            .strict(),
        order_items: zod_1.z
            .array(zod_1.z
            .object({
            product_id: zod_1.z
                .string({
                invalid_type_error: "Product id must be a text",
            })
                .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, "Invalid Product"),
            quantity: zod_1.z
                .number({ invalid_type_error: "Quantity must be a number" })
                .nonnegative({ message: "Quantity must be a positive number" })
                .optional(),
        })
            .strict())
            .nonempty("Order items are required"),
        payment_method: zod_1.z
            .enum(Object.values(client_1.PaymentMethod))
            .optional(),
        delivery_method: zod_1.z
            .enum(Object.values(client_1.DeliveryMethod))
            .optional(),
        coupon_code: zod_1.z
            .string({
            invalid_type_error: "Coupon code must be a text",
        })
            .min(1, "Coupon code should not empty string")
            .optional(),
        comment: zod_1.z
            .string({ invalid_type_error: "Comment must be a text" })
            .optional(),
    })
        .strict(),
});
const updateOrderByAdminValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        delivery_method: zod_1.z
            .enum(Object.values(client_1.DeliveryMethod))
            .optional(),
        payment_method: zod_1.z
            .enum(Object.values(client_1.PaymentMethod))
            .optional(),
        order_status: zod_1.z
            .enum(Object.values(client_1.OrderStatus))
            .optional(),
        payment_status: zod_1.z
            .enum(Object.values(client_1.PaymentStatus))
            .optional(),
        comment: zod_1.z
            .string({ invalid_type_error: "Comment must be a text" })
            .optional(),
    })
        .strict(),
});
const updateOrderByCustomerValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        payment_method: zod_1.z
            .enum(Object.values(client_1.PaymentMethod))
            .optional(),
        delivery_method: zod_1.z
            .enum(Object.values(client_1.DeliveryMethod))
            .optional(),
        comment: zod_1.z
            .string({ invalid_type_error: "Comment must be a text" })
            .optional(),
        customer_information: zod_1.z
            .object({
            name: zod_1.z
                .string({
                invalid_type_error: "Name must be a text",
            })
                .min(1, "Name should not empty string")
                .optional(),
            email: zod_1.z.string().email({ message: "Invalid email" }).optional(),
            contact_number: zod_1.z
                .string()
                .regex(/^01\d{9}$/, {
                message: "Contact number must be a valid Bangladeshi number like as 01511111111",
            })
                .optional(),
            address: zod_1.z
                .string({
                invalid_type_error: "Address must be a text",
            })
                .min(1, "Address should not empty string")
                .optional(),
            city: zod_1.z
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
exports.OrderValidations = {
    createOrderForRegisteredUserValidationSchema,
    createOrderForGuestUserValidationSchema,
    updateOrderByAdminValidationSchema,
    updateOrderByCustomerValidationSchema,
};
