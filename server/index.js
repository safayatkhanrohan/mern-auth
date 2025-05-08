import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
dotenv.config();

import userRouter from "./src/routes/userRouter.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import connectDB from "./src/config/dbConfig.js";

const app = express();

connectDB();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(
     cors({
          origin: ["http://localhost", "http://localhost:80"],
          credentials: true,
     })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/api", userRouter);

app.use(errorHandler);
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
});
