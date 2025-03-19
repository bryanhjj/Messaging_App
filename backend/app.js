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

const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL
];
const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
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