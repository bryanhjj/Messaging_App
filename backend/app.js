// let's try postgreSQL (hosted via Neon) and Prisma ORM for this project
const express = require("express");
const app = express();
const cors =  require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));