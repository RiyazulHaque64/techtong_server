"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandValidations = void 0;
const zod_1 = require("zod");
const addBrandValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z
            .string({
            invalid_type_error: "Brand name must be a text",
        })
            .min(1, "Brand name is required"),
        description: zod_1.z
            .string({ invalid_type_error: "Brand description must be a text" })
            .optional(),
        icon: zod_1.z
            .string({ invalid_type_error: "Brand icon must be an URL" })
            .url("Brand icon must be a valid URL")
            .optional(),
    })
        .strict(),
});
const updateBrandValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z
            .string({
            invalid_type_error: "Brand name must be a text",
        })
            .optional(),
        description: zod_1.z
            .string({ invalid_type_error: "Brand description must be a text" })
            .optional(),
        icon: zod_1.z
            .string({ invalid_type_error: "Brand icon must be an URL" })
            .url("Brand icon must be a valid URL")
            .optional(),
    })
        .strict(),
});
exports.BrandValidations = {
    addBrandValidationSchema,
    updateBrandValidationSchema,
};
