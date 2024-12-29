import express from "express";
import { allProfileGet, specificProfileGet, editProfilePut} from "../controllers/profileController.js";
import isAuth from "./isAuthMiddleware.js";

const profileRouter = express.Router();

profileRouter.get( // get all profiles
    "/",
    isAuth,
    allProfileGet,
);
profileRouter.get( // get specific profile
    "/:profileId",
    isAuth,
    specificProfileGet,
);

export default profileRouter;