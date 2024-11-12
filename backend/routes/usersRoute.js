const { Router } = require("express");
const userController = require('../controllers/usersController');
const usersRouter = Router();
const passport = require("../config/passport");

usersRouter.get(
    "/users", 
    passport.authenticate("local", { successRedirect: "/", failureRedirect: "/"}), 
    userController.usersAllGet
);

module.exports = usersRouter;