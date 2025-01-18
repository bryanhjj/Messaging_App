import { Prisma, PrismaClient } from '@prisma/client';
import { getLoggedUserInfo } from './usersController.js';

const prisma = new PrismaClient();

export const allProfileGet = async (req, res) => {
    const result = await prisma.profile.findMany();
    res.json(result);
};
export const specificProfileGet = async (req, res) => {
    const { profileId } = req.params;
    const result = await prisma.profile.findFirst({
        where: { id: profileId },
    });
    res.json(result);
};

export const editProfilePut = async (req, res) => {
    const { profileId } = req.params;
    const { bio } = req.body;
    const result = await prisma.profile.update({
        where: { id: profileId },
        data: { bio: bio },
    });
    res.json(result);
};