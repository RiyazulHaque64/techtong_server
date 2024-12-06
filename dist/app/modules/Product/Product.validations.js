"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidations = void 0;
const zod_1 = require("zod");
const addProductValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z
            .string({
            required_error: "Product name is required",
            invalid_type_error: "Product name must be a text",
        })
            .min(1, "Product name is required"),
        model: zod_1.z
            .string({
            required_error: "Product model is required",
            invalid_type_error: "Product model must be a text",
        })
            .min(1, "Product model is required"),
        brand_id: zod_1.z
            .string({
            invalid_type_error: "Brand id must be a text",
        })
            .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, "Invalid ID")
            .optional(),
        category_id: zod_1.z
            .string({
            invalid_type_error: "Category id must be a text",
        })
            .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, "Invalid ID")
            .optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        code: zod_1.z
            .string({
            required_error: "Product code is required",
            invalid_type_error: "Product code must be a text",
        })
            .length(6, "Product code must be 6 characters long")
            .optional(),
        stock: zod_1.z
            .number({
            invalid_type_error: "Product stock must be a number",
        })
            .nonnegative("Product stock must be a positive number")
            .optional(),
        price: zod_1.z
            .number({
            required_error: "Product price is required",
            invalid_type_error: "Product price must be a number",
        })
            .nonnegative("Product price must be a positive number"),
        discount_price: zod_1.z
            .number({ invalid_type_error: "Discount price must be a number" })
            .nonnegative("Discount price must be a positive number")
            .optional(),
        retailer_price: zod_1.z
            .number({ invalid_type_error: "Retailer price must be a number" })
            .nonnegative("Retailer price must be a positive number")
            .optional(),
        thumbnail: zod_1.z
            .string({ invalid_type_error: "Thumbnail must be an URL" })
            .url("Thumbnail must be a valid URL")
            .optional(),
        images: zod_1.z
            .array(zod_1.z
            .string({ invalid_type_error: "Image must be an URL" })
            .url("Invalid image URL detected"))
            .optional(),
        description: zod_1.z
            .string({ invalid_type_error: "Description must be a text or HTML" })
            .optional(),
        specification: zod_1.z
            .string({ invalid_type_error: "Specification must be a text or HTML" })
            .optional(),
        additional_information: zod_1.z
            .string({
            invalid_type_error: "Additional information must be a text or HTML",
        })
            .optional(),
        key_features: zod_1.z
            .array(zod_1.z.string({ invalid_type_error: "Key feature must be a text" }))
            .optional(),
        attributes: zod_1.z
            .array(zod_1.z.object({ slug: zod_1.z.string(), value: zod_1.z.string() }))
            .optional(),
    })
        .strict(),
});
const updateProductValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z
            .string({
            invalid_type_error: "Product name must be a text",
        })
            .min(1, "Product name is required")
            .optional(),
        model: zod_1.z
            .string({
            invalid_type_error: "Product model must be a text",
        })
            .min(1, "Product model is required")
            .optional(),
        brand_id: zod_1.z
            .string({
            invalid_type_error: "Brand id must be a text",
        })
            .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, "Invalid ID")
            .optional(),
        category_id: zod_1.z
            .string({
            required_error: "Category id is required",
            invalid_type_error: "Category id must be a text",
        })
            .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, "Invalid ID")
            .optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        code: zod_1.z
            .string({
            invalid_type_error: "Product code must be a text",
        })
            .length(6, "Product code must be 6 characters long")
            .optional(),
        stock: zod_1.z
            .number({
            invalid_type_error: "Product stock must be a number",
        })
            .nonnegative("Product stock must be a positive number")
            .optional(),
        price: zod_1.z
            .number({
            invalid_type_error: "Product price must be a number",
        })
            .nonnegative("Product price must be a positive number")
            .optional(),
        discount_price: zod_1.z
            .number({ invalid_type_error: "Discount price must be a number" })
            .nonnegative("Discount price must be a positive number")
            .optional(),
        retailer_price: zod_1.z
            .number({ invalid_type_error: "Retailer price must be a number" })
            .nonnegative("Retailer price must be a positive number")
            .optional(),
        thumbnail: zod_1.z
            .string({ invalid_type_error: "Thumbnail must be an URL" })
            .url("Thumbnail must be a valid URL")
            .optional(),
        images: zod_1.z
            .array(zod_1.z
            .string({ invalid_type_error: "Image must be an URL" })
            .url("Invalid image URL detected"))
            .optional(),
        description: zod_1.z
            .string({ invalid_type_error: "Description must be a text or HTML" })
            .optional(),
        specification: zod_1.z
            .string({ invalid_type_error: "Specification must be a text or HTML" })
            .optional(),
        additional_information: zod_1.z
            .string({
            invalid_type_error: "Additional information must be a text or HTML",
        })
            .optional(),
        key_features: zod_1.z
            .array(zod_1.z.string({ invalid_type_error: "Key feature must be a text" }))
            .optional(),
        video_url: zod_1.z
            .string({ invalid_type_error: "Video url must be a valid URL" })
            .url("Video url must be a valid URL")
            .optional(),
        attributes: zod_1.z
            .array(zod_1.z.object({ slug: zod_1.z.string(), value: zod_1.z.string() }))
            .optional(),
        featured: zod_1.z
            .boolean({ invalid_type_error: "Featured value must be true or false" })
            .optional(),
        published: zod_1.z
            .boolean({
            invalid_type_error: "Published value must be true or false",
        })
            .optional(),
    })
        .strict(),
});
exports.ProductValidations = {
    addProductValidationSchema,
    updateProductValidationSchema,
};
