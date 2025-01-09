import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const allChatroomGet = async (req, res) => {
    const result = await prisma.chatroom.findMany();
    res.json(result);
};

export const userChatroomGet = async (req, res) => {
    const result = await prisma.chatroom.findMany({
        where: { 
            users: {
                some: { 
                    id: Number(req.user.id),
                },
            },
        },
        select: {
            id: true,
            users: {
                select: {
                    id: true,
                },
            },
            messages: true,
            createdAt: true,
        },
    });
    res.json(result);
};

export const chatroomCreatePost = async (req, res) => {
    const result = await prisma.chatroom.create({
        data: {
            users: { connect: { id: Number(req.user.id) }},
        },
    });
    res.json(result);
};

export const addChatroomUserPut = async (req, res) => {
    const { chatroomId } = req.params;
    const { newUserId } = req.body;
    const result = await prisma.chatroom.update({
        where: { id: Number(chatroomId) },
        data: {
            users: { connect: { id: Number(newUserId) } },
        },
    });
    res.json(result);
};

export const removeChatroomUserPut = async (req, res) => {
    const { chatroomId } = req.params;
    const result = await prisma.chatroom.update({
        where: { id: Number(chatroomId) },
        data: {
            users: { disconnect: { id: Number(req.user.id) } }
        },
    });
    res.json(result);
};

export const chatroomDelete = async (req, res) => {
    const { chatroomId } = req.params;
    const result = await prisma.chatroom.delete({
        where: { id: Number(chatroomId) },
    });
    res.json(result);
};