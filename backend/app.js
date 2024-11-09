// let's try postgreSQL (hosted via Neon) and Prisma ORM for this project
const express = require("express");
const app = express();
const cors =  require('cors');
const { Pool } = require("pg");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session({ secret: env("SESSION_SECRET"), resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));