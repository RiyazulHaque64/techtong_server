import { z } from "zod";

const addProductValidationSchema = z.object({
  body: z
    .object({
      name: z
        .string({
          required_error: "Product name is required",
          invalid_type_error: "Product name must be a text",
        })
        .min(1, "Product name is required"),
      model: z
        .string({
          required_error: "Product model is required",
          invalid_type_error: "Product model must be a text",
        })
        .min(1, "Product model is required"),
      brand_id: z
        .string({
          invalid_type_error: "Brand id must be a text",
        })
        .regex(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
          "Invalid ID"
        )
        .optional(),
      categories: z
        .array(
          z.object({
            id: z
              .string({
                invalid_type_error: "Category id must be a text",
              })
              .regex(
                /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
                "Invalid ID"
              ),
          })
        )
        .optional(),

      tags: z.array(z.string()).optional(),
      code: z
        .string({
          required_error: "Product code is required",
          invalid_type_error: "Product code must be a text",
        })
        .optional(),
      stock: z
        .number({
          invalid_type_error: "Product stock must be a number",
        })
        .nonnegative("Product stock must be a positive number")
        .optional(),
      price: z
        .number({
          required_error: "Product price is required",
          invalid_type_error: "Product price must be a number",
        })
        .nonnegative("Product price must be a positive number"),
      discount_price: z
        .number({ invalid_type_error: "Discount price must be a number" })
        .nonnegative("Discount price must be a positive number")
        .optional(),
      retailer_price: z
        .number({ invalid_type_error: "Retailer price must be a number" })
        .nonnegative("Retailer price must be a positive number")
        .optional(),
      thumbnail: z
        .string({ invalid_type_error: "Thumbnail must be an URL" })
        .optional(),
      images: z
        .array(z.string({ invalid_type_error: "Image must be an URL" }))
        .optional(),
      description: z
        .string({ invalid_type_error: "Description must be a text or HTML" })
        .optional(),
      specification: z
        .array(
          z.object({
            heading: z.string(),
            fields: z.array(z.object({ title: z.string(), value: z.string() })),
          })
        )
        .optional(),
      additional_information: z
        .string({
          invalid_type_error: "Additional information must be a text or HTML",
        })
        .optional(),
      key_features: z
        .array(z.string({ invalid_type_error: "Key feature must be a text" }))
        .optional(),
      warranty: z.string().optional(),
      video_url: z
        .string({ invalid_type_error: "Video url must be a valid URL" })
        .url("Video url must be a valid URL")
        .optional(),
      attributes: z
        .array(z.object({ title: z.string(), value: z.array(z.string()) }))
        .optional(),
    })
    .strict(),
});

const updateProductValidationSchema = z.object({
  body: z
    .object({
      name: z
        .string({
          invalid_type_error: "Product name must be a text",
        })
        .min(1, "Product name is required")
        .optional(),
      model: z
        .string({
          invalid_type_error: "Product model must be a text",
        })
        .min(1, "Product model is required")
        .optional(),
      brand_id: z
        .string({
          invalid_type_error: "Brand id must be a text",
        })
        .regex(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
          "Invalid ID"
        )
        .optional(),
      categories: z
        .array(
          z.object({
            id: z
              .string({
                invalid_type_error: "Category id must be a text",
              })
              .regex(
                /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
                "Invalid ID"
              ),
          })
        )
        .optional(),
      tags: z.array(z.string()).optional(),
      code: z
        .string({
          invalid_type_error: "Product code must be a text",
        })
        .optional(),
      stock: z
        .number({
          invalid_type_error: "Product stock must be a number",
        })
        .nonnegative("Product stock must be a positive number")
        .optional(),
      price: z
        .number({
          invalid_type_error: "Product price must be a number",
        })
        .nonnegative("Product price must be a positive number")
        .optional(),
      discount_price: z
        .number({ invalid_type_error: "Discount price must be a number" })
        .nonnegative("Discount price must be a positive number")
        .optional(),
      retailer_price: z
        .number({ invalid_type_error: "Retailer price must be a number" })
        .nonnegative("Retailer price must be a positive number")
        .optional(),
      thumbnail: z
        .string({ invalid_type_error: "Thumbnail must be an URL" })
        .optional(),
      images: z
        .array(z.string({ invalid_type_error: "Image must be an URL" }))
        .optional(),
      description: z
        .string({ invalid_type_error: "Description must be a text or HTML" })
        .optional(),
      specification: z
        .array(
          z.object({
            heading: z.string(),
            fields: z.array(z.object({ title: z.string(), value: z.string() })),
          })
        )
        .optional(),
      additional_information: z
        .string({
          invalid_type_error: "Additional information must be a text or HTML",
        })
        .optional(),
      key_features: z
        .array(z.string({ invalid_type_error: "Key feature must be a text" }))
        .optional(),
      warranty: z.string().optional(),
      video_url: z
        .string({ invalid_type_error: "Video url must be a valid URL" })
        .url("Video url must be a valid URL")
        .optional(),
      attributes: z
        .array(z.object({ title: z.string(), value: z.array(z.string()) }))
        .optional(),
      featured: z
        .boolean({ invalid_type_error: "Featured value must be true or false" })
        .optional(),
      published: z
        .boolean({
          invalid_type_error: "Published value must be true or false",
        })
        .optional(),
    })
    .strict(),
});

const deleteProductsValidationSchema = z.object({
  body: z
    .object({
      ids: z
        .array(
          z
            .string({
              invalid_type_error: "ID must be a text",
            })
            .regex(
              /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
              "Invalid ID"
            )
        )
        .min(1, "At least one ID is required"),
    })
    .strict(),
});

export const ProductValidations = {
  addProductValidationSchema,
  updateProductValidationSchema,
  deleteProductsValidationSchema,
};
