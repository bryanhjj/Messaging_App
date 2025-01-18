import express from "express";
import {
    usersAllGet, 
    usersSearchNameGet, 
    usersSearchIdGet, 
    usersCreatePost, 
    usersUpdatePut, 
    usersDelete,
    verifyUserToken
} from '../controllers/usersController.js';
const usersRouter = express.Router();

usersRouter.get( // get all users
    "/", 
    verifyUserToken,
    usersAllGet,
);
usersRouter.get( // search for specific user via username
    "/searchName",
    verifyUserToken,
    usersSearchNameGet,
);
usersRouter.get( // search for specific user via id
    "/searchId",
    verifyUserToken,
    usersSearchIdGet,
);
usersRouter.post( // new user sign-up
    "/signup",
    usersCreatePost,
)
usersRouter.put( // update user details
    "/:userId",
    verifyUserToken,
    usersUpdatePut,
);
usersRouter.delete( // delete a user account
    "/:userId",
    verifyUserToken,
    usersDelete,
);

export default usersRouter;