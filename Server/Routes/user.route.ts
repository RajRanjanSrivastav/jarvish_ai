import express from "express";
import { isAuth } from "../MiddleWare/isAuth.js";
import { getCurrentUser } from "../Controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/getCurrentUser", isAuth, getCurrentUser);

export default userRouter;
