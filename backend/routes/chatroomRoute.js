import { Router } from "express";
import isAuth from "./isAuthMiddleware.js";
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
    isAuth,
    allChatroomGet,
);
chatroomRouter.get( // get current logged in user's chatrooms
    "/dashboard",
    isAuth,
    userChatroomGet,
);
chatroomRouter.post( // make a new chatroom
    "/dashboard",
    isAuth,
    chatroomCreatePost,
);
chatroomRouter.put( // adds a new user to an existing chatroom
    "/join/:chatroomId",
    isAuth,
    addChatroomUserPut,
);
chatroomRouter.put( // user leaves a chatroom
    "/leave/:chatroomId",
    isAuth,
    removeChatroomUserPut,
);
chatroomRouter.delete( // deletes a chatroom
    "/:chatroomId",
    isAuth,
    chatroomDelete,
);

export default chatroomRouter;