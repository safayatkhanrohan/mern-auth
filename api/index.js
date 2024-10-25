import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
dotenv.config();

import userRouter from "./routes/userRouter.js";
import { errorHandler } from "./middleware/errorHandler.js";
import connectDB from "./config/dbConfig.js";

const app = express();
const __dirname = path.resolve();

connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/api", userRouter);

app.use(errorHandler);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
