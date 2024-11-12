const { Router } = require("express");
const userController = require('../controllers/usersController');
const usersRouter = Router();
const passport = require("../config/passport");

usersRouter.get( // get all users
    "/", 
    userController.usersAllGet,
);
usersRouter.get( // search for specific user
    "/:userId",
    userController.usersSearchPost,
);
usersRouter.post( // new user sign-up
    "/signup",
    userController.usersCreatePost,
)
usersRouter.put( // update user details
    "/:userId",
    userController.usersUpdatePost,
);
usersRouter.delete( // delete a user account
    "/:userId",
    userController.usersDelete,
);

module.exports = usersRouter;