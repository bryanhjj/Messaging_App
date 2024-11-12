const express = require('express');
const passport = require("../config/passport");

const authRouter = express.Router();

authRouter.post("/login", passport.authenticate("local", {failureRedirect: "/", successRedirect: "/"}));
authRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/auth/login");
  });
});

module.exports = authRouter;