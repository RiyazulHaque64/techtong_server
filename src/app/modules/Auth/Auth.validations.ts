import { z } from "zod";

const createOTPValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a text",
    }),
    email: z.string().email({ message: "Invalid email" }).optional(),
    contact_number: z
      .string({ required_error: "Contact number is required" })
      .regex(/^01\d{9}$/, {
        message:
          "Contact number must be a valid Bangladeshi number with 11 digits",
      }),
  }),
});

const registerValidationSchema = z.object({
  body: z.object({
    otp: z
      .string({ required_error: "OTP is required" })
      .regex(/^\d{6}$/, { message: "OTP must be exactly 6 digits" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, {
        message: "Password must contain at least one letter and one number",
      }),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    emailOrContactNumber: z
      .string()
      .min(1, { message: "Email or contact number is required" }),
    password: z.string({ required_error: "Password is required" }),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string().min(6, "Old valid password is required"),
    newPassword: z
      .string({ required_error: "New password is required" })
      .min(6, { message: "password must be at least 6 characters long" })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, {
        message: "Password must contain at least one letter and one number",
      }),
  }),
});

const forgotPasswordValidationSchema = z.object({
  body: z.object({
    emailOrContactNumber: z
      .string({
        required_error: "Email or contact number is required",
      })
      .refine(
        (value: string) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const bangladeshiPhoneRegex = /^01\d{9}$/;
          return emailRegex.test(value) || bangladeshiPhoneRegex.test(value);
        },
        {
          message: "Invalid email or contact number",
        }
      ),
  }),
});

export const AuthValidations = {
  resetPasswordValidationSchema,
  registerValidationSchema,
  createOTPValidationSchema,
  loginValidationSchema,
  forgotPasswordValidationSchema,
};
