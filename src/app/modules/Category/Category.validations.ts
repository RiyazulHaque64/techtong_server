import { z } from "zod";

const addCategoryValidationSchema = z.object({
  body: z
    .object({
      title: z.string({
        invalid_type_error: "Category title must be a text",
        required_error: "Category title is required",
      }),
      slug: z
        .string({
          invalid_type_error: "Category slug must be a text",
        })
        .optional(),
      description: z
        .string({ invalid_type_error: "Category description must be a text" })
        .optional(),
      parent_id: z
        .string({
          invalid_type_error: "Category parent id must be a text",
        })
        .optional(),
      icon: z
        .string({ invalid_type_error: "Category icon must be an URL" })
        .optional(),
    })
    .strict(),
});

export const CategoryValidations = {
  addCategoryValidationSchema,
};
