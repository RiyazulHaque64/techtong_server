"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartValidations = void 0;
const zod_1 = require("zod");
const addToCartValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        product_id: zod_1.z
            .string({
            invalid_type_error: "Product id must be a text",
        })
            .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, "Invalid ID"),
        quantity: zod_1.z
            .number({
            invalid_type_error: "Quantity must be a number",
        })
            .default(1)
            .optional(),
    })
        .strict(),
});
const updateCartItemValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        quantity: zod_1.z
            .number({ invalid_type_error: "Quantity must be a number" })
            .optional(),
    })
        .strict(),
});
exports.CartValidations = {
    addToCartValidationSchema,
    updateCartItemValidationSchema,
};
