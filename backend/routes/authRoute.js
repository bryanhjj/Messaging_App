import { Router } from "express";
import { usersLogin } from "../controllers/usersController.js";

const authRouter = Router();

// user login
authRouter.post("/login", usersLogin);

// user logout
authRouter.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/auth/login");
  });
});

export default authRouter;