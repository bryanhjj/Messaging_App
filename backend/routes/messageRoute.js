import { Router } from "express";
import { messageAllGet, messageSendPost, messageEditPut, messageDelete} from '../controllers/messageController.js';
import isAuth from "./isAuthMiddleware.js";

const messageRouter = Router();

messageRouter.get( // gets every message
    "/:chatroomId",
    isAuth,
    messageAllGet, 
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