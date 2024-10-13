export interface IOTPCreatePayload {
  name: string;
  email: string;
  password: string;
  contact_number: string;
  profile_pic_id: string;
}
export interface IRegisterPayload {
  otp: string;
  password: string;
}

export interface ILoginCredential {
  emailOrContactNumber: string;
  password: string;
}

export interface IChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}
