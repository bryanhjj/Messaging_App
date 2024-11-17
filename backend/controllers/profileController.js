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

exports.editProfilePut = async (req, res) => {
    const { profileId } = req.params;
    const { bio } = req.body;
    const result = await prisma.profile.update({
        where: { id: profileId },
        data: { bio: bio },
    });
    res.json(result);
};