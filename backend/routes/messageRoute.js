import { Router } from "express";
import { chatroomMessageGet, messageSendPost, messageEditPut, messageDelete } from '../controllers/messageController.js';
import isAuth from "./isAuthMiddleware.js";

const messageRouter = Router();

messageRouter.get( // gets every message in a specified chatroom
    "/:chatroomId",
    isAuth,
    chatroomMessageGet, 
);
messageRouter.post( // user sends a message to a chatroom
    "/:chatroomId", 
    isAuth, 
    messageSendPost,
);
messageRouter.put( // user edits their message
    "/:chatroomId/:messageId",
    isAuth,
    messageEditPut,
);
messageRouter.delete( // user deletes their message
    "/:chatroomId/:messageId",
    isAuth,
    messageDelete,
);

export default messageRouter;