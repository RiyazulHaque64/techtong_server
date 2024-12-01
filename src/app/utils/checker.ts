import httpStatus from "http-status";
import ApiError from "../error/ApiError";

export const validDateChecker = (date: string, key: string) => {
  const valid_date = new Date(date);
  if (isNaN(valid_date.getTime())) {
    throw new ApiError(httpStatus.BAD_REQUEST, `${key} is not a valid date`);
  }
  return valid_date;
};
