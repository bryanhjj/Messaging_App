const { Router } = require("express");
const userController = require('../controllers/usersController');
const { isAuth } = require("./isAuthMiddleware");
const usersRouter = Router();

usersRouter.get( // get all users
    "/", 
    isAuth,
    userController.usersAllGet,
);
usersRouter.get( // search for specific user
    "/:userId",
    isAuth,
    userController.usersSearchGet,
);
usersRouter.post( // new user sign-up
    "/signup",
    userController.usersCreatePost,
)
usersRouter.put( // update user details
    "/:userId",
    isAuth,
    userController.usersUpdatePut,
);
usersRouter.delete( // delete a user account
    "/:userId",
    isAuth,
    userController.usersDelete,
);

module.exports = usersRouter;