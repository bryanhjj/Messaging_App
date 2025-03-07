import { Router } from "express";
import { usersLogin, usersLogout } from "../controllers/usersController.js";

const authRouter = Router();

// user login
authRouter.post("/login", usersLogin);

// user logout
authRouter.post("/logout", usersLogout);

export default authRouter;