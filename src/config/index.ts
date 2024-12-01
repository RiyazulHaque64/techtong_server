import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  super_admin_name: process.env.SUPER_ADMIN_NAME,
  super_admin_user_name: process.env.SUPER_ADMIN_USER_NAME,
  super_admin_email: process.env.SUPER_ADMIN_EMAIL,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
  salt_rounds: process.env.SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expiresin: process.env.JWT_ACCESS_EXPIRESIN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expiresin: process.env.JWT_REFRESH_EXPIRESIN,
  cloud_name: process.env.CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  twilio_sid: process.env.TWILIO_SID,
  twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
  twilio_phone_number: process.env.TWILIO_PHONE_NUMBER,
  app_email_address: process.env.APP_EMAIL_ADDRESS,
  email_app_pass: process.env.EMAIL_APP_PASS,
  supabase_bucket_url: process.env.SUPABASE_BUCKET_URL,
  supabase_bucket_key: process.env.SUPABASE_BUCKET_KEY,
  supabase_bucket_name: process.env.SUPABASE_BUCKET_NAME,
};
