import { UserRole } from "@prisma/client";
import { z } from "zod";
import { userRole, userStatus } from "./User.constants";

const updateProfileValidationSchema = z.object({
  body: z
    .object({
      name: z
        .string({
          invalid_type_error: "Name must be a text",
        })
        .optional(),
    })
    .strict(),
});

const updateUserRoleAndStatusValidationSchema = z.object({
  body: z
    .object({
      id: z.string({
        required_error: "User id is required",
        invalid_type_error: "User id must be a text",
      }),
      role: z
        .enum([...userRole] as [string], {
          message: "Invalid role",
        })
        .optional(),
      status: z
        .enum([...userStatus] as [string], {
          message: "Invalid status",
        })
        .optional(),
    })
    .strict()
    .refine((data) => data.role || data.status, {
      path: ["role", "status"],
      message: "Either role or status must be provided",
    }),
});

const deleteUserValidationSchema = z.object({
  body: z
    .object({
      id: z.string({
        required_error: "User id is required",
        invalid_type_error: "User id must be a text",
      }),
    })
    .strict(),
});

export const UserValidations = {
  updateProfileValidationSchema,
  updateUserRoleAndStatusValidationSchema,
  deleteUserValidationSchema,
};
