import { z } from "zod";

const addCourierValidationSchema = z.object({
    body: z
        .object({
            name: z
                .string({
                    invalid_type_error: "Courier name must be a text",
                })
                .min(1, "Courier name is required"),
            address: z.string().optional(),
            email: z.string()
                .optional()
                .refine((value) => !value || z.string().email().safeParse(value).success, {
                    message: 'Invalid email!',
                }),
            contact_number: z.string()
                .optional()
                .refine((value) => !value || z.string().regex(/^01\d{9}$/).safeParse(value).success, {
                    message: 'Contact number must be a valid Bangladeshi number like as "01511111111"',
                }),
        })
        .strict(),
});

const updateCourierValidationSchema = z.object({
    body: z
        .object({
            name: z
                .string({
                    invalid_type_error: "Courier name must be a text",
                })
                .optional(),
            address: z.string().optional(),
            email: z.string()
                .optional()
                .refine((value) => !value || z.string().email().safeParse(value).success, {
                    message: 'Invalid email!',
                }),
            contact_number: z.string()
                .optional()
                .refine((value) => !value || z.string().regex(/^01\d{9}$/).safeParse(value).success, {
                    message: 'Contact number must be a valid Bangladeshi number like as "01511111111"',
                }),
        })
        .strict(),
});

const deleteCouriersValidationSchema = z.object({
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

export const CourierValidations = {
    addCourierValidationSchema,
    updateCourierValidationSchema,
    deleteCouriersValidationSchema
};
