declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    DATABASE_URL: string;
    SALT_ROUNDS: number;
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_EXPIRESIN: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRESIN: string;
    SUPER_ADMIN_NAME: string;
    SUPER_ADMIN_USER_NAME: string;
    SUPER_ADMIN_PASSWORD: string;
    SUPER_ADMIN_EMAIL: string;
    CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    TWILIO_SID: string;
    TWILIO_AUTH_TOKEN: string;
    TWILIO_PHONE_NUMBER: string;
  }
}
