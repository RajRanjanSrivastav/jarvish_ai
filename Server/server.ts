import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./Configs/ConnectDB.js";
import authRouter from "./Routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./Routes/user.route.js";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.json("Hello form JARVISH");
});

const PORT = process.env.PORT;

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT Number : ${PORT}`);
  connectDB();
});
