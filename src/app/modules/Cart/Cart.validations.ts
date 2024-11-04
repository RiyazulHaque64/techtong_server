import { z } from "zod";

const addToCartValidationSchema = z.object({
  body: z.object({
    product_id: z
      .string({
        invalid_type_error: "Product id must be a text",
      })
      .regex(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
        "Invalid ID"
      ),
    quantity: z
      .number({
        invalid_type_error: "Quantity must be a number",
      })
      .optional(),
  }),
});

export const CartValidations = {
  addToCartValidationSchema,
};
