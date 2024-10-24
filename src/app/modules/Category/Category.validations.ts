import { z } from "zod";

const addCategoryValidationSchema = z.object({
  body: z
    .object({
      title: z.string({
        invalid_type_error: "Category title must be a text",
        required_error: "Category title is required",
      }),
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
        .string({ invalid_type_error: "Category icon must be an URL" })
        .url("Category icon must be a valid URL")
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
        .string({ invalid_type_error: "Category icon must be an URL" })
        .url("Category icon must be a valid URL")
        .optional(),
    })
    .strict(),
});

export const CategoryValidations = {
  addCategoryValidationSchema,
  updateCategoryValidationSchema,
};
