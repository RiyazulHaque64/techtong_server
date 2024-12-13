import { z } from "zod";

const addCategoryValidationSchema = z.object({
  body: z
    .object({
      title: z
        .string({
          invalid_type_error: "Category title must be a text",
        })
        .min(1, "Category title is required"),
      description: z
        .string({ invalid_type_error: "Category description must be a text" })
        .optional(),
      parent_id: z
        .string({
          invalid_type_error: "Category parent id must be a text",
        })
        .regex(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
          "Invalid ID"
        )
        .optional(),
      icon: z
        .string({ invalid_type_error: "Category icon must be a path" })
        .optional(),
    })
    .strict(),
});

const updateCategoryValidationSchema = z.object({
  body: z
    .object({
      title: z
        .string({
          invalid_type_error: "Category title must be a text",
        })
        .optional(),
      description: z
        .string({ invalid_type_error: "Category description must be a text" })
        .optional(),
      parent_id: z
        .string({
          invalid_type_error: "Category parent id must be a text",
        })
        .regex(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
          "Invalid ID"
        )
        .optional(),
      icon: z
        .string({ invalid_type_error: "Category icon must be a path" })
        .optional(),
    })
    .strict(),
});

const deleteCategoriesValidationSchema = z.object({
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

export const CategoryValidations = {
  addCategoryValidationSchema,
  updateCategoryValidationSchema,
  deleteCategoriesValidationSchema,
};
