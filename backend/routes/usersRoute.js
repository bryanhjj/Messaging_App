const { Router } = require("express");
const userController = require('../controllers/usersController');
const usersRouter = Router();
const passport = require("../config/passport");

usersRouter.get( // get all users
    "/", 
    passport.authenticate("local", {failureRedirect: "/"}), 
    userController.usersAllGet,
);
usersRouter.get( // search for specific user
    "/:userId",
    passport.authenticate("local", {failureRedirect: "/"}),
    userController.usersSearchPost,
);
usersRouter.post( // new user sign-up
    "/signup",
    userController.usersCreatePost,
)
usersRouter.put( // udpate user details
    "/:userId",
    passport.authenticate("local", {failureRedirect: "/"}),
    userController.usersUpdatePost,
);
usersRouter.delete( // delete a user account
    "/:userId",
    passport.authenticate("local", {failureRedirect: "/"}),
    userController.usersDelete,
);

module.exports = usersRouter;