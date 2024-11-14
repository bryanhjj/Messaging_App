const { Prisma, PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.allChatroomGet = async (req, res) => {
    const result = await prisma.chatroom.findMany();
    res.json(result);
};

exports.userChatroomGet = async (req, res) => {
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

exports.chatroomCreatePost = async (req, res) => {
    const result = await prisma.chatroom.create({
        data: {
            users: { connect: { id: req.user.id }},
        },
    });
    res.json(result);
};

exports.addChatroomUserPut = async (req, res) => {
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

exports.removeChatroomUserPut = async (req, res) => {
    const { chatroomId } = req.params;
    const result = await prisma.chatroom.update({
        where: { id: chatroomId },
        data: {
            users: { disconnect: { id: req.user.id } }
        },
    });
    res.json(result);
};

exports.chatroomDelete = async (req, res) => {
    const { chatroomId } = req.params;
    const result = await prisma.chatroom.delete({
        where: { id: chatroomId },
    });
    res.json(result);
};