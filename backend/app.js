// let's try postgreSQL (hosted via Neon) and Prisma ORM for this project
const express = require("express");
const app = express();
const cors =  require('cors');
const session = require("express-session");
const usersRouter = require("./routes/usersRoute");
const authRouter = require("./routes/authRoute");
const messageRouter = require("./routes/messageRoute");
const profileRouter = require("./routes/profileRoute");
const passport = require("../config/passport");

// remember to set up dotenv for session secret & etc
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session({ 
  secret: "SESSION_SECRET", 
  resave: false, 
  saveUninitialized: true,
  store: sessionStorage,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // ie. 1 day
  },
}));
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/message", messageRouter);
app.use("/profile", profileRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));