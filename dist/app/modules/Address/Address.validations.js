"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressValidations = void 0;
const zod_1 = require("zod");
const addAddressValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        address: zod_1.z
            .string({
            invalid_type_error: "Address must be a text",
        })
            .min(1, "Address is required"),
        email: zod_1.z.string().email({ message: "Invalid email" }).optional(),
        contact_number: zod_1.z
            .string()
            .regex(/^01\d{9}$/, {
            message: "Contact number must be a valid Bangladeshi number like as 01511111111",
        })
            .optional(),
        city: zod_1.z
            .string({
            invalid_type_error: "City must be a text",
        })
            .min(1, "City is required"),
    })
        .strict(),
});
const updateAddressValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        address: zod_1.z
            .string({
            invalid_type_error: "Address must be a text",
        })
            .min(1, "Address is required")
            .optional(),
        email: zod_1.z.string().email({ message: "Invalid email" }).optional(),
        contact_number: zod_1.z
            .string()
            .regex(/^01\d{9}$/, {
            message: "Contact number must be a valid Bangladeshi number like as 01511111111",
        })
            .optional(),
        city: zod_1.z
            .string({
            invalid_type_error: "City must be a text",
        })
            .min(1, "City is required")
            .optional(),
    })
        .strict(),
});
exports.AddressValidations = {
    addAddressValidationSchema,
    updateAddressValidationSchema,
};
