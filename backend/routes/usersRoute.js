const { Router } = require("express");
const userController = require('../controllers/usersController');
const usersRouter = Router();

usersRouter.get("/users", userController.usersAllGet);

module.exports = usersRouter;