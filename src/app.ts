import express, { Application, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import cookiePerser from "cookie-parser";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundHandler from "./app/middlewares/notFoundHandler";
import swaggerRoutes from "./app/routes/swagger.routes";
import router from "./app/routes";

const app: Application = express();

// third party middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiePerser());
app.use(
  cors({
    origin: [
      "https://techtong-client.vercel.app",
      "http://localhost:8081",
      "http://localhost:8084",
    ],
    credentials: true,
  })
);

// test server
app.get("/", (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: "Techtong server is working fine",
  });
});

// main routes
app.use("/api/v1", router);

app.use("/api-docs", swaggerRoutes);

// handle error
app.use(globalErrorHandler);
app.use(notFoundHandler);

export default app;
