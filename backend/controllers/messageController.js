import { Prisma, PrismaClient } from '@prisma/client';
import { getLoggedUserInfo } from './usersController.js';

const prisma = new PrismaClient();

export const messageAllGet = async (req, res) => {
    const result = await prisma.message.findMany();
    res.json(result);
};

export const chatroomMessageGet = async(req, res) => {
    const { chatroomId } = req.params;
    const result = await prisma.message.findMany({
        where: {
            chatroomId: Number(chatroomId),
        },
        select: {
            id: true,
            content: true,
            createdAt: true,
            authorId: true,
        },
    });
    res.json(result);
};

export const messageSendPost = async (req, res) => {
    const { content } = req.body;
    const { chatroomId } = req.params;
    const curUserInfo = getLoggedUserInfo(req, res);
    const result = await prisma.message.create({
        data: {
            // allegedly we can just set the foreign key directly, let's try that
            // else, https://www.prisma.io/docs/orm/reference/prisma-client-reference#connect
            content,
            chatroomId: Number(chatroomId),
            authorId: Number(curUserInfo.user.id),
        },
    });
    res.json(result);
};

export const messageEditPut = async (req, res) => {
    const { messageId } = req.params;
    const { content } = req.body;
    const curUserInfo = getLoggedUserInfo(req, res);
    const originalMessage = await prisma.message.findUnique({
        where: { id: Number(messageId) },
    });
    if (originalMessage.authorId === Number(curUserInfo.user.id)) {
        const result = await prisma.message.update({
            where: { id: Number(messageId) },
            data: { content: content },
        });
        res.json(result);
    } else {
        res.statusMessage = "You are not authorized to perform this action.";
        res.status(401).end();
    }
};

export const messageDelete = async (req, res) => {
    const { messageId } = req.params;
    const curUserInfo = getLoggedUserInfo(req, res);
    const originalMessage = await prisma.message.findUnique({
        where: { id: Number(messageId) },
    });
    if (originalMessage.authorId === Number(curUserInfo.user.id)) {
        const result = await prisma.message.delete({
            where: { id: Number(messageId) },
        });
        res.json(result);
    } else {
        res.statusMessage = "You are not authorized to perform this action.";
        res.status(401).end();
    }
};