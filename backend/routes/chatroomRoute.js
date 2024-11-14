const { Router } = require("express");
const { isAuth } = require("./isAuthMiddleware");
const chatroomController = require("../controllers/chatroomController");

const chatroomRouter = Router();

chatroomRouter.get( // get every single chatroom
    "/",
    isAuth,
    chatroomController.allChatroomGet,
);
chatroomRouter.get( // get current logged in user's chatrooms
    "/dashboard",
    isAuth,
    chatroomController.userChatroomGet,
);
chatroomRouter.post( // make a new chatroom
    "/dashboard",
    isAuth,
    chatroomController.chatroomCreatePost,
);
chatroomRouter.put( // adds a new user to an existing chatroom
    "/join/:chatroomId",
    isAuth,
    chatroomController.addChatroomUserPut,
);
chatroomRouter.put( // user leaves a chatroom
    "/leave/:chatroomId",
    isAuth,
    chatroomController.removeChatroomUserPut,
);
chatroomRouter.delete( // deletes a chatroom
    "/:chatroomId",
    isAuth,
    chatroomController.chatroomDelete,
);

module.exports = chatroomRouter;