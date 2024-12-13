import { z } from "zod";

const addAttributeValidationSchema = z.object({
  body: z
    .object({
      category_id: z
        .string({
          invalid_type_error: "Category id must be a text",
        })
        .regex(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
          "Invalid ID"
        )
        .optional(),
      name: z
        .string({
          invalid_type_error: "Attribute name must be a text",
        })
        .min(1, "Attribute name is required"),
      value: z
        .array(z.string({ invalid_type_error: "Value must be a text" }))
        .optional(),
    })
    .strict(),
});

const updateAttributeValidationSchema = z.object({
  body: z
    .object({
      category_id: z
        .string({
          invalid_type_error: "Category id must be a text",
        })
        .regex(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
          "Invalid ID"
        )
        .optional(),
      name: z
        .string({
          invalid_type_error: "Attribute name must be a text",
        })
        .min(1, "Attribute name is required")
        .optional(),
      value: z
        .array(z.string({ invalid_type_error: "Value must be a text" }))
        .optional(),
    })
    .strict(),
});

const deleteAttributesValidationSchema = z.object({
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

export const AttributeValidations = {
  addAttributeValidationSchema,
  updateAttributeValidationSchema,
  deleteAttributesValidationSchema,
};
