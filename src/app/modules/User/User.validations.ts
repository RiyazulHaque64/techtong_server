import { z } from "zod";

const updateProfileValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Name must be a text",
      })
      .optional(),
  }),
});

export const UserValidations = {
  updateProfileValidationSchema,
};
