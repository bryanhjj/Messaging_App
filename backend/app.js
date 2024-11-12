// let's try postgreSQL (hosted via Neon) and Prisma ORM for this project
const express = require("express");
const app = express();
const cors =  require('cors');
const session = require("express-session");
const usersRouter = require("./routes/usersRoute");
// remember to set up dotenv for session secret & etc

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session({ secret: "SESSION_SECRET", resave: false, saveUninitialized: false }));
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));