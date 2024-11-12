const { Router } = require("express");
const messageController = require('../controllers/messageController');
const passport = require("../config/passport");

const messageRouter = Router();