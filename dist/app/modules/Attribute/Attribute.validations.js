"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeValidations = void 0;
const zod_1 = require("zod");
const addAttributeValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        category_id: zod_1.z
            .string({
            invalid_type_error: "Category id must be a text",
        })
            .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, "Invalid ID")
            .optional(),
        name: zod_1.z
            .string({
            invalid_type_error: "Attribute name must be a text",
        })
            .min(1, "Attribute name is required"),
        value: zod_1.z
            .array(zod_1.z.string({ invalid_type_error: "Value must be a text" }))
            .optional(),
    })
        .strict(),
});
const updateAttributeValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        category_id: zod_1.z
            .string({
            invalid_type_error: "Category id must be a text",
        })
            .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, "Invalid ID")
            .optional(),
        name: zod_1.z
            .string({
            invalid_type_error: "Attribute name must be a text",
        })
            .min(1, "Attribute name is required")
            .optional(),
        value: zod_1.z
            .array(zod_1.z.string({ invalid_type_error: "Value must be a text" }))
            .optional(),
    })
        .strict(),
});
exports.AttributeValidations = {
    addAttributeValidationSchema,
    updateAttributeValidationSchema,
};
