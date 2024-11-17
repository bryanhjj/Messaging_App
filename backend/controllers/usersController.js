const { body, validationResult } = require("express-validator");
const { Prisma, PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const validateUser = [
    body("username")
        .trim()
        .notEmpty().withMessage("Username is required.")
        .escape(),
    body("password")
        .trim()
        .notEmpty().withMessage("Password is required."),
    body("email")
        .trim()
        .notEmpty()
        .isEmail().withMessage("Must be an email."),
    body("bio")
        .optional()
        .trim(),
];

const prisma = new PrismaClient();

exports.usersAllGet = async (req, res) => {
    const result = await prisma.user.findMany();
    res.json(result);
};

exports.usersCreatePost = [
    validateUser,
    async (req, res) => {
        new LocalStrategy(bcrypt.hash(req.body.password, 8, async(err, hashedPassword) => {
            if (err) {
                return err;
            } else {
                const {username, email, bio} = req.body;
                const result = await prisma.user.create({
                    data: {
                        username,
                        email,
                        password: hashedPassword,
                        profile: { // creates a profile when a user registers
                            create: [
                                { 
                                    bio: bio, 
                                },
                            ] 
                        },
                    },
                });
                res.json(result);
            }
        }));
    }
];

exports.usersUpdatePut = async (req, res) => {
    const { userId } = req.params;
    const { email } = req.body;
    const result = await prisma.user.update({
        where: {
            id: Number(userId),
        },
        data: {
            email: email,
        }
    });
    res.json(result);
};

exports.usersSearchGet = async (req, res) => {
    const { email } = req.body;
    const result = await prisma.user.findUnique({
        where: {email : email},
    });
    res.json(result);
};

exports.usersDelete = async (req, res) => {
    const { userId } = req.params;
    // ensures that the current logged in user is that same as the about-to-be-deleted user before proceeding
    if (req.user.id === userId) {
        const result = await prisma.user.delete({
            where: {
                id: Number(userId),
            }
        });
        res.json(result);
    } else {
        res.statusMessage = "You are not authorized to perform this action.";
        res.status(401).end();
    }
};