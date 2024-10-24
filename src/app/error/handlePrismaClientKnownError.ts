import { TErrorSources, TGenericErrorResponse } from "../interfaces/error";
import { Prisma } from "@prisma/client";
import httpStatus from "http-status";

const handlePrismaClientKnownError = (
  err: Prisma.PrismaClientKnownRequestError
): TGenericErrorResponse => {
  let statusCode = 400;
  let message = "Database error!";
  let errorSources: TErrorSources[] = [];

  if (err.code === "P2002" && err.meta?.target) {
    statusCode = httpStatus.CONFLICT;
    message = "Unique constraint violation. Duplicate value exists.";
    errorSources = (err.meta.target as string[]).map((field: string) => ({
      path: field,
      message: `The ${field} is already exists in the ${err.meta?.modelName}. Duplicate value found.`,
    }));
  }

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handlePrismaClientKnownError;
