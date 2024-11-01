import { z } from "zod";

const addAddressValidationSchema = z.object({
  body: z
    .object({
      address: z
        .string({
          invalid_type_error: "Address must be a text",
        })
        .min(1, "Address is required"),
      email: z.string().email({ message: "Invalid email" }).optional(),
      contact_number: z
        .string()
        .regex(/^01\d{9}$/, {
          message:
            "Contact number must be a valid Bangladeshi number like as 01511111111",
        })
        .optional(),
      city: z
        .string({
          invalid_type_error: "City must be a text",
        })
        .min(1, "City is required"),
    })
    .strict(),
});

const updateAddressValidationSchema = z.object({
  body: z
    .object({
      address: z
        .string({
          invalid_type_error: "Address must be a text",
        })
        .min(1, "Address is required")
        .optional(),
      email: z.string().email({ message: "Invalid email" }).optional(),
      contact_number: z
        .string()
        .regex(/^01\d{9}$/, {
          message:
            "Contact number must be a valid Bangladeshi number like as 01511111111",
        })
        .optional(),
      city: z
        .string({
          invalid_type_error: "City must be a text",
        })
        .min(1, "City is required")
        .optional(),
    })
    .strict(),
});

export const AddressValidations = {
  addAddressValidationSchema,
  updateAddressValidationSchema,
};
