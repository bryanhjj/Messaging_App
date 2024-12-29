import express from "express";
import {
    usersAllGet, 
    usersSearchNameGet, 
    usersSearchIdGet, 
    usersCreatePost, 
    usersUpdatePut, 
    usersDelete
} from '../controllers/usersController.js';
import isAuth from "./isAuthMiddleware.js";
const usersRouter = express.Router();

usersRouter.get( // get all users
    "/", 
    isAuth,
    usersAllGet,
);
usersRouter.get( // search for specific user via username
    "/searchName",
    isAuth,
    usersSearchNameGet,
);
usersRouter.get( // search for specific user via id
    "/searchId",
    isAuth,
    usersSearchIdGet,
);
usersRouter.post( // new user sign-up
    "/signup",
    usersCreatePost,
)
usersRouter.put( // update user details
    "/:userId",
    isAuth,
    usersUpdatePut,
);
usersRouter.delete( // delete a user account
    "/:userId",
    isAuth,
    usersDelete,
);

export default usersRouter;