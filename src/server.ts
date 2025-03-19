import http from 'http';
import cron from "node-cron";
import { Server } from "socket.io";
import app from "./app";
import { seedSuperAdmin } from "./app/db";
import { CouponServices } from "./app/modules/Coupon/Coupon.services";
import clearOldOTPs from "./app/utils/clearOldOTPs";
import config from "./config";

const port = config.port || 9000;

const server = http.createServer(app)

// initialize socket.io
export const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

async function main() {
  try {
    await seedSuperAdmin();

    // start server
    server.listen(port, () => {
      console.log(`Techtong server is running on port ${port}`);
    });

    // cron schedule to clear OTP
    cron.schedule("0 0 * * *", () => {
      clearOldOTPs();
      CouponServices.updateCouponActiveStatus();
    });

    // socket.io connection
    io.on("connection", (socket) => {
      console.log(`A user connected: ${socket.id}`);

      socket.on("disconnect", () => {
        console.log(`A user disconnected: ${socket.id}`);
      })
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
