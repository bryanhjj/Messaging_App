import { Router } from "express";
import { verifyUserToken } from '../controllers/usersController.js';
import {
    allChatroomGet,
    userChatroomGet,
    chatroomCreatePost,
    addChatroomUserPut,
    removeChatroomUserPut,
    chatroomDelete,
} from "../controllers/chatroomController.js";

const chatroomRouter = Router();

chatroomRouter.get( // get every single chatroom
    "/",
    verifyUserToken,
    allChatroomGet,
);
chatroomRouter.get( // get current logged in user's chatrooms
    "/dashboard",
    verifyUserToken,
    userChatroomGet,
);
chatroomRouter.post( // make a new chatroom
    "/dashboard",
    verifyUserToken,
    chatroomCreatePost,
);
chatroomRouter.put( // adds a new user to an existing chatroom
    "/join/:chatroomId",
    verifyUserToken,
    addChatroomUserPut,
);
chatroomRouter.put( // user leaves a chatroom
    "/leave/:chatroomId",
    verifyUserToken,
    removeChatroomUserPut,
);
chatroomRouter.delete( // deletes a chatroom
    "/:chatroomId",
    verifyUserToken,
    chatroomDelete,
);

export default chatroomRouter;