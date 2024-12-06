"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidations = void 0;
const zod_1 = require("zod");
const addCategoryValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        title: zod_1.z
            .string({
            invalid_type_error: "Category title must be a text",
        })
            .min(1, "Category title is required"),
        description: zod_1.z
            .string({ invalid_type_error: "Category description must be a text" })
            .optional(),
        parent_id: zod_1.z
            .string({
            invalid_type_error: "Category parent id must be a text",
        })
            .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, "Invalid ID")
            .optional(),
        icon: zod_1.z
            .string({ invalid_type_error: "Category icon must be an URL" })
            .url("Category icon must be a valid URL")
            .optional(),
    })
        .strict(),
});
const updateCategoryValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        title: zod_1.z
            .string({
            invalid_type_error: "Category title must be a text",
        })
            .optional(),
        description: zod_1.z
            .string({ invalid_type_error: "Category description must be a text" })
            .optional(),
        parent_id: zod_1.z
            .string({
            invalid_type_error: "Category parent id must be a text",
        })
            .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, "Invalid ID")
            .optional(),
        icon: zod_1.z
            .string({ invalid_type_error: "Category icon must be an URL" })
            .url("Category icon must be a valid URL")
            .optional(),
    })
        .strict(),
});
exports.CategoryValidations = {
    addCategoryValidationSchema,
    updateCategoryValidationSchema,
};
