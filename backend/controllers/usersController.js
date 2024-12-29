import { body, validationResult } from "express-validator";
import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from "passport-local";

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

const usersAllGet = async(req, res) => {
    const result = await prisma.user.findMany();
    res.json(result);
};

const usersCreatePost = [
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

const usersUpdatePut = async (req, res) => {
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

const usersSearchNameGet = async (req, res) => {
    const { username } = req.body; // searches based on username
    const result = await prisma.user.findUnique({
        where: {username : username},
    });
    res.json(result);
};

const usersSearchIdGet = async (req, res) => {
    const { id } = req.body; // searches based on id
    const result = await prisma.user.findUnique({
        where: {id : id},
    });
    res.json(result);
};

const usersDelete = async (req, res) => {
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

export {
    usersAllGet, 
    usersSearchNameGet, 
    usersSearchIdGet, 
    usersCreatePost, 
    usersUpdatePut, 
    usersDelete
};