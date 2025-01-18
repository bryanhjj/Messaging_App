import express from "express";
import { allProfileGet, specificProfileGet, editProfilePut} from "../controllers/profileController.js";
import { verifyUserToken } from '../controllers/usersController.js';

const profileRouter = express.Router();

profileRouter.get( // get all profiles
    "/",
    verifyUserToken,
    allProfileGet,
);
profileRouter.get( // get specific profile
    "/:profileId",
    verifyUserToken,
    specificProfileGet,
);

export default profileRouter;