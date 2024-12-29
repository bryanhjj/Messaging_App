import { body, validationResult } from "express-validator";
import { Prisma, PrismaClient } from '@prisma/client';

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

export const messageAllGet = async (req, res) => {
    const result = await prisma.message.findMany();
    res.json(result);
};

export const messageSendPost = async (req, res) => {
    const { content } = req.body;
    const { chatroomId } = req.params;
    const result = await prisma.message.create({
        data: {
            // allegedly we can just set the foreign key directly, let's try that
            // else, https://www.prisma.io/docs/orm/reference/prisma-client-reference#connect
            content,
            chatroomId: chatroomId,
            authorId: req.user.id,
        },
    });
    res.json(result);
};

export const messageEditPut = async (req, res) => {
    const { messageId } = req.params;
    const { content } = req.body;
    const result = await prisma.message.update({
        where: { id: messageId },
        data: { content: content },
    });
    res.json(result);
};

// to implement a check to ensure that users can only delete their own messages
export const messageDelete = async (req, res) => {
    const { messageId } = req.params;
    const result = await prisma.message.delete({
        where: { id: messageId },
    });
    res.json(result);
};