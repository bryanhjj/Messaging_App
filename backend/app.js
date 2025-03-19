// let's try postgreSQL (hosted via Neon) and Prisma ORM for this project
import express from "express";
import 'dotenv/config'
import cors from "cors";
import cookieParser from "cookie-parser";
import usersRouter from "./routes/usersRoute.js";
import authRouter from "./routes/authRoute.js";
import messageRouter from "./routes/messageRoute.js";
import profileRouter from "./routes/profileRoute.js";
import chatroomRouter from "./routes/chatroomRoute.js";



const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/message", messageRouter);
app.use("/profile", profileRouter);
app.use("/chatroom", chatroomRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));

/*
------------------     NOTES      ------------------
3)    (Optional, extra credit) implement a friendlist system                      
*/