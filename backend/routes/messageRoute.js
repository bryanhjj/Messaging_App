import { Router } from "express";
import { chatroomMessageGet, messageSendPost, messageEditPut, messageDelete } from '../controllers/messageController.js';
import { verifyUserToken } from '../controllers/usersController.js';

const messageRouter = Router();

messageRouter.get( // gets every message in a specified chatroom
    "/:chatroomId",
    verifyUserToken,
    chatroomMessageGet, 
);
messageRouter.post( // user sends a message to a chatroom
    "/:chatroomId", 
    verifyUserToken, 
    messageSendPost,
);
messageRouter.put( // user edits their message
    "/:chatroomId/:messageId",
    verifyUserToken,
    messageEditPut,
);
messageRouter.delete( // user deletes their message
    "/:chatroomId/:messageId",
    verifyUserToken,
    messageDelete,
);

export default messageRouter;