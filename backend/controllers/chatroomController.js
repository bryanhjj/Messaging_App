import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const allChatroomGet = async (req, res) => {
    const result = await prisma.chatroom.findMany();
    res.json(result);
};

export const userChatroomGet = async (req, res) => {
    const result = await prisma.chatroom.findMany({
        where: { users: {
                    some: { 
                        id: req.user.id,
                    },
                },
                select: {
                    id: true,
                    users: {
                        where: {
                            id: req.user.id,
                        },
                        select: {
                            id: true,
                        },
                    },
                },
        },
    });
    res.json(result);
};

export const chatroomCreatePost = async (req, res) => {
    const result = await prisma.chatroom.create({
        data: {
            users: { connect: { id: req.user.id }},
        },
    });
    res.json(result);
};

export const addChatroomUserPut = async (req, res) => {
    const { chatroomId } = req.params;
    const { newUser } = req.body; // to further look into this
    const result = await prisma.chatroom.update({
        where: { id: chatroomId },
        data: {
            users: { connect: { id: newUser.id } },
        },
    });
    res.json(result);
};

export const removeChatroomUserPut = async (req, res) => {
    const { chatroomId } = req.params;
    const result = await prisma.chatroom.update({
        where: { id: chatroomId },
        data: {
            users: { disconnect: { id: req.user.id } }
        },
    });
    res.json(result);
};

export const chatroomDelete = async (req, res) => {
    const { chatroomId } = req.params;
    const result = await prisma.chatroom.delete({
        where: { id: chatroomId },
    });
    res.json(result);
};