const express = require('express');
const passport = require("../config/passport");

const authRouter = express.Router();

// user login
authRouter.post("/login", passport.authenticate("local", {failureRedirect: "/", successRedirect: "/"}));

// user logout
authRouter.get("/logout", (req, res, next) => {
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

module.exports = authRouter;