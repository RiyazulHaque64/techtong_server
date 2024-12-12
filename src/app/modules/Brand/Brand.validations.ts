import { z } from "zod";

const addBrandValidationSchema = z.object({
  body: z
    .object({
      name: z
        .string({
          invalid_type_error: "Brand name must be a text",
        })
        .min(1, "Brand name is required"),
      description: z
        .string({ invalid_type_error: "Brand description must be a text" })
        .optional(),
      icon: z
        .string({ invalid_type_error: "Brand icon must be a path" })
        .optional(),
    })
    .strict(),
});

const updateBrandValidationSchema = z.object({
  body: z
    .object({
      name: z
        .string({
          invalid_type_error: "Brand name must be a text",
        })
        .optional(),
      description: z
        .string({ invalid_type_error: "Brand description must be a text" })
        .optional(),
      icon: z
        .string({ invalid_type_error: "Brand icon must be a path" })
        .optional(),
    })
    .strict(),
});

const deleteBrandsValidationSchema = z.object({
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

export const BrandValidations = {
  addBrandValidationSchema,
  updateBrandValidationSchema,
  deleteBrandsValidationSchema,
};
