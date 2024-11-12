const { body, validationResult } = require("express-validator");
const { Prisma, PrismaClient } = require('@prisma/client');

// req.user;
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