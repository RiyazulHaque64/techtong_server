import { z } from "zod";

const addProductValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Product name is required",
      invalid_type_error: "Product name must be a text",
    }),
    model: z.string({
      required_error: "Product model is required",
      invalid_type_error: "Product model must be a text",
    }),
    description: z.string().optional(),
    specification: z.array(
      z.object({
        heading: z.string(),
        fields: z.array(
          z.object({ title: z.string(), value: z.array(z.string()) })
        ),
      })
    ),
    additional_information: z.string().optional(),
    key_features: z.array(z.string()).optional(),
    brand_id: z.string({
      required_error: "Brand id is required",
      invalid_type_error: "Brand id must be a text",
    }),
    category_id: z.string({
      required_error: "Category id is required",
      invalid_type_error: "Category id must be a text",
    }),
    type: z
      .string({
        invalid_type_error: "Product type must be a text",
      })
      .optional(),
    tags: z.array(z.string()).optional(),
    code: z
      .string({
        required_error: "Product code is required",
        invalid_type_error: "Product code must be a text",
      })
      .length(6, "Product code must be 6 characters long"),
    stock: z
      .number({
        required_error: "Product stock is required",
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
  }),
});

export const ProductValidations = {
  addProductValidationSchema,
};
