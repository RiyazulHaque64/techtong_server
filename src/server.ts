import { Server } from "http";
import app from "./app";
import config from "./config";
import cron from "node-cron";
import clearOldOTPs from "./app/utils/clearOldOTPs";
import { CouponServices } from "./app/modules/Coupon/Coupon.services";
import { seedSuperAdmin } from "./app/db";

const port = config.port || 9000;

let server: Server;

async function main() {
  try {
    await seedSuperAdmin();
    server = app.listen(port, () => {
      console.log(`Techtong server is running on port ${port}`);
    });

    // cron schedule to clear OTP
    cron.schedule("0 0 * * *", () => {
      clearOldOTPs();
      CouponServices.updateCouponActiveStatus();
    });
  } catch (error) {
    console.log(error);
  }
}

// handle unhandledRejection
process.on("unhandledRejection", () => {
  console.log("Unhandled rejection is detected. shutting down...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// handle uncaught expception
process.on("uncaughtException", () => {
  console.log("Uncaught exception is detected. shutting down...");
  process.exit(1);
});

main();
