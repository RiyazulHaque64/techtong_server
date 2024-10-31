import { z } from "zod";

const addAddressValidationSchema = z.object({
  body: z
    .object({
      name: z.string({
        invalid_type_error: "Brand name must be a text",
        required_error: "Brand name is required",
      }),
      description: z
        .string({ invalid_type_error: "Brand description must be a text" })
        .optional(),
      icon: z
        .string({ invalid_type_error: "Brand icon must be an URL" })
        .url("Brand icon must be a valid URL")
        .optional(),
    })
    .strict(),
});

export const AddressValidations = {
  addAddressValidationSchema,
};
