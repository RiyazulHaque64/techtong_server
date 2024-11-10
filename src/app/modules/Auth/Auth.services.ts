import { UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import config from "../../../config";
import ApiError from "../../error/ApiError";
import prisma from "../../shared/prisma";
import { generateToken } from "../../utils/jwtHelpers";
import {
  IChangePasswordPayload,
  IOTPCreatePayload,
  IRegisterPayload,
  ILoginCredential,
} from "./Auth.interfaces";
import sendOTP, { OTPGenerator, verifyOTP } from "../../utils/SendOTP";
import { TAuthUser } from "../../interfaces/common";
import { generatePassword } from "../../utils/generatePassword";
import sendEmail from "../../utils/sendEmail";
import { userSelectedFields } from "../User/User.constants";

const createOTP = async (data: IOTPCreatePayload) => {
  const generatedOTP = OTPGenerator();
  const expirationTime = (new Date().getTime() + 2 * 60000).toString();
  const SMSBody = `Dear ${
    data.name || "customer"
  }, your OTP is: ${generatedOTP} \nTECHTONG`;

  const emailBody = `<div style="background-color: #F5F5F5; width: 80%; padding: 40px; display: flex; direction: column; justify-content: center; align-items: center">
            <h1>Your OTP is:</h1>
            <p style="font-size: 20px; font-weight: bold; background-color: #3352ff; padding: 10px; color: white; border-radius: 8px">${generatedOTP}</p>
        </div>`;

  if (data.email) {
    await sendEmail(data.email, emailBody);
  }

  await sendOTP(data.contact_number, SMSBody);

  const result = await prisma.userOTP.create({
    data: {
      name: data.name,
      email: data.email || null,
      contact_number: data.contact_number,
      otp: generatedOTP,
      expires_at: expirationTime,
    },
    select: {
      contact_number: true,
      expires_at: true,
    },
  });

  return result;
};

const register = async (data: IRegisterPayload) => {
  const storedOTP = await prisma.userOTP.findFirst({
    where: {
      otp: Number(data.otp),
    },
  });
  if (!storedOTP) {
    throw new ApiError(httpStatus.FORBIDDEN, "OTP not matched");
  }
  const verifiedOTP = await verifyOTP(
    Number(data.otp),
    storedOTP.otp,
    Number(storedOTP.expires_at)
  );
  if (verifiedOTP.success === false) {
    throw new ApiError(httpStatus.FORBIDDEN, verifiedOTP.message);
  }

  const hashedPassword = await bcrypt.hash(
    data.password,
    Number(config.salt_rounds)
  );

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name: storedOTP.name,
        email: storedOTP.email || null,
        contact_number: storedOTP.contact_number,
        password: hashedPassword,
      },
      select: {
        ...userSelectedFields,
      },
    });
    await tx.userOTP.delete({
      where: {
        otp: Number(data.otp),
      },
    });
    return user;
  });

  return result;
};

const login = async (credential: ILoginCredential) => {
  const { emailOrContactNumber, password } = credential;

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: emailOrContactNumber,
        },
        {
          contact_number: emailOrContactNumber,
        },
      ],
      status: UserStatus.ACTIVE,
      is_deleted: false,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, "User not found");
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Email, contact number or password is invalid"
    );
  }

  const passwordChangedTime = Math.floor(
    new Date(user.password_changed_at).getTime() / 1000
  );

  const jwtPayload = {
    id: user.id,
    contact_number: user.contact_number,
    email: user.email,
    role: user.role,
    password_changed_at: passwordChangedTime,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expiresin
  );

  const refreshToken = generateToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expiresin
  );

  return {
    accessToken,
    refreshToken,
  };
};

const resetPassword = async (
  user: TAuthUser | undefined,
  payload: IChangePasswordPayload
) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      id: user?.id,
    },
  });

  const checkPassword = await bcrypt.compare(
    payload.oldPassword,
    userInfo.password
  );

  if (!checkPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Old password is invalid");
  }

  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.salt_rounds)
  );

  const result = await prisma.user.update({
    where: {
      id: userInfo?.id,
    },
    data: {
      password: hashedPassword,
      password_changed_at: new Date(),
    },
    select: {
      ...userSelectedFields,
    },
  });

  return result;
};

const forgotPassword = async (emailOrContactNumber: string) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: emailOrContactNumber,
        },
        {
          contact_number: emailOrContactNumber,
        },
      ],
      status: UserStatus.ACTIVE,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, "User not found");
  }

  const generatedPassword = generatePassword(6);
  const hashedPassword = await bcrypt.hash(
    generatedPassword,
    Number(config.salt_rounds)
  );

  const emailBody = `<div style="background-color: #F5F5F5; width: 80%; padding: 40px; display: flex; direction: column;        justify-content: center; align-items: center">
            <h1>Your new password is:</h1>
            <p style="font-size: 20px; font-weight: bold; background-color: #3352ff; padding: 10px; color: white; border-radius: 8px">${generatedPassword}</p>
        </div>`;

  if (user.email) {
    await sendEmail(user.email, emailBody);
  }

  const SMSBody = `Dear ${
    user.name || "customer"
  }, your new password is: ${generatedPassword} \nTECHTONG`;

  const sentPassword = await sendOTP(user.contact_number, SMSBody);

  if (!sentPassword) {
    throw new ApiError(httpStatus.FORBIDDEN, "Failed to send password");
  }

  await prisma.user.update({
    where: {
      contact_number: user.contact_number,
    },
    data: {
      password: hashedPassword,
      password_changed_at: new Date(),
    },
  });

  return null;
};

export const AuthServices = {
  createOTP,
  register,
  login,
  resetPassword,
  forgotPassword,
};
