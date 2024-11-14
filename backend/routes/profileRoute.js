const { Router } = require("express");
const profileController = require("../controllers/profileController");
const { isAuth } = require("./isAuthMiddleware");

const profileRouter = Router();

profileRouter.get( // get all profiles
    "/",
    isAuth,
    profileController.allProfileGet,
);
profileRouter.get( // get specific profile
    "/:profileId",
    isAuth,
    profileController.specificProfileGet,
);

module.exports = profileRouter;