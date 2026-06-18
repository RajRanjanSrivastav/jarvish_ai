import express from "express";
import { googlAuth, logOut } from "../Controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/google", googlAuth);
authRouter.get("/logout", logOut);

export default authRouter;