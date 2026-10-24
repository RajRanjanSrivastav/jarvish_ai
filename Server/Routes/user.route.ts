import express from "express";
import { isAuth } from "../MiddleWare/isAuth.js";
import {
  getCurrentUser,
  saveAssistant,
} from "../Controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/getCurrentUser", isAuth, getCurrentUser);
userRouter.post("/saveAssistant", isAuth, saveAssistant);

export default userRouter;
