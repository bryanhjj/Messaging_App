const { Prisma, PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.allProfileGet = async (req, res) => {
    const result = await prisma.profile.findMany();
    res.json(result);
};

exports.specificProfileGet = async (req, res) => {
    const { profileId } = req.params;
    const result = await prisma.profile.findFirst({
        where: { id: profileId },
    });
    res.json(result);
};