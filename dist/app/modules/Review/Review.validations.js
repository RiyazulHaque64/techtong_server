"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidations = void 0;
const zod_1 = require("zod");
const createReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        product_id: zod_1.z
            .string({
            required_error: "Product id is required",
            invalid_type_error: "Product id must be a text",
        })
            .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, "Invalid ID"),
        rating: zod_1.z
            .number({ required_error: "Rating is required" })
            .min(1, "Rating must be at least 1")
            .max(5, "Rating must be at most 5"),
        comment: zod_1.z
            .string({ required_error: "Comment is required" })
            .min(1, "Comment is required"),
    }),
});
exports.ReviewValidations = {
    createReviewValidationSchema,
};
