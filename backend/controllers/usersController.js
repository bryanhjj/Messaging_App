import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const usersAllGet = async(req, res) => {
    const result = await prisma.user.findMany();
    res.json(result);
};

const usersCreatePost = 
    async (req, res) => {
        bcrypt.hash(req.body.password, 8, async(err, hashedPassword) => {
            if (err) {
                return err;
            } else {
                const {username, email, bio} = req.body;
                const result = await prisma.user.create({
                    data: {
                        username: username,
                        email: email,
                        password: hashedPassword,
                        profile: { // creates a profile when a user registers
                            create: 
                                { bio: bio, },
                        },
                    },
                    include: {
                        profile: true,
                    }
                });
                res.json(result);
            }
        });
};

const usersUpdatePut = async (req, res) => {
    const { userId } = req.params;
    const { email } = req.body;
    const result = await prisma.user.update({
        where: {
            id: userId,
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
                id: userId,
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