import { Router } from "express";
import passport from "../config/passport.js";
const authRouter = Router();

// user login
authRouter.post("/login", passport.authenticate("local", {failureRedirect: "/login", successRedirect: "/"}));

// user logout
authRouter.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/auth/login");
  });
});

// passes logged-in user details for react use
authRouter.get("/user", (req, res) => {
  res.status(200).json({ user: req.user });
});

export default authRouter;