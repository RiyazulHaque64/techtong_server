import { UserRole, UserStatus } from "@prisma/client";

export type TUpdateUserRoleAndStatusPayload = {
  id: string;
  role?: UserRole;
  status?: UserStatus;
};
