const { Router } = require("express");
const messageController = require('../controllers/messageController');
const { isAuth } = require("./isAuthMiddleware");

const messageRouter = Router();

messageRouter.get( // gets every message in a chatroom
    "/:chatroomId",
    isAuth,
    messageController, // yet to be implemented
);
messageRouter.post( // user sends a message to a chatroom
    "/:chatroomId", 
    isAuth, 
    messageController.messageSendPost,
);
messageRouter.put( // user edits their message
    "/:chatroomId/:messageId",
    isAuth,
    messageController.messageEditPut,
);
messageRouter.delete( // user deletes their message
    "/:chatroomId/:messageId",
    isAuth,
    messageController.messageDelete,
);

module.exports = messageRouter;