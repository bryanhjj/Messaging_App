const { body, validationResult } = require("express-validator");
const { Prisma, PrismaClient } = require('@prisma/client');

// do we want a validator?
/*
const validateUser = [
    body("firstName")
        .trim()
        .isAlpha().withMessage(`First name ${alphaErr}`)
        .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
    body("lastName")
        .trim()
        .isAlpha().withMessage(`Last name ${alphaErr}`)
        .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
    body("email")
        .trim()
        .notEmpty()
        .isEmail().withMessage("Must be an email."),
    body("age")
        .optional()
        .trim()
        .isInt({min : 18, max : 120}).withMessage(`Age ${ageErr}`),
    body("bio")
        .optional()
        .trim(),
];
*/

const prisma = new PrismaClient();

// to implement bcryptjs into usersCreatePost
exports.usersCreatePost = async (req, res) => {
    const {username, email, password} = req.body;
    const result = await prisma.user.create({
        data: {
            username,
            email,
            password
        }
    });
    res.json(result);
};

exports.usersAllGet = async (req, res) => {
    const result = await prisma.user.findMany();
    res.json(result);
};