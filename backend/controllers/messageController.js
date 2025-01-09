import { Prisma, PrismaClient } from '@prisma/client';

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
    const result = await prisma.message.create({
        data: {
            // allegedly we can just set the foreign key directly, let's try that
            // else, https://www.prisma.io/docs/orm/reference/prisma-client-reference#connect
            content,
            chatroomId: Number(chatroomId),
            authorId: Number(req.user.id),
        },
    });
    res.json(result);
};

export const messageEditPut = async (req, res) => {
    const { messageId } = req.params;
    const { content } = req.body;
    const result = await prisma.message.update({
        where: { id: Number(messageId) },
        data: { content: content },
    });
    res.json(result);
};

// to implement a check to ensure that users can only delete their own messages
export const messageDelete = async (req, res) => {
    const { messageId } = req.params;
    const result = await prisma.message.delete({
        where: { id: Number(messageId) },
    });
    res.json(result);
};