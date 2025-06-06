import { Prisma, PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
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
    const curUserInfo = getLoggedUserInfo(req, res);

    if (Number(curUserInfo.user.id) === Number(userId)) {
        const result = await prisma.user.update({
            where: {
                id: Number(userId),
            },
            data: {
                email: email,
            }
        });
        res.json(result);
    } else {
        res.status(403).json({ message: 'You are not authorized to perform this action.' });
    }
};

const usersSearchNameGet = async (req, res) => {
    const { username } = req.query; // searches based on username
    const result = await prisma.user.findMany({
        where: {username : username},
    });
    res.json(result);
};

const usersSearchIdGet = async (req, res) => {
    const { id } = req.query; // searches based on id
    const result = await prisma.user.findUnique({
        where: {id : Number(id)},
    });
    res.json(result);
};

const usersDelete = async (req, res) => {
    const { userId } = req.params;
    const curUserInfo = getLoggedUserInfo(req, res);

    if (Number(curUserInfo.user.id) === Number(userId)) {
        const deleteProfile = prisma.profile.delete({
            where: {
                userId: Number(userId),
            },
        });
        const deleteUserMsg = prisma.message.deleteMany({
            where: {
                authorId: Number(userId),
            },
        });
        const deleteUser = prisma.user.delete({
            where: {
                id: Number(userId),
            },
        });
        const transaction = await prisma.$transaction([deleteProfile, deleteUserMsg, deleteUser]);
        res.json(transaction);
    } else {
        res.status(403).json({ message: 'You are not authorized to perform this action.' });
    }
};

const usersLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique(
        { where: { email: email }, }
    );
    if (!user) {
        throw new Error("Incorrect email or password.");
    };
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error("Incorrect email or password.");
    };
    jwt.sign(
        {user}, 
        process.env.SESSION_SECRET,
        {expiresIn: "10h"},
        (err, token) => {
            if (err) {
                res.status(500).json({message: "An error has occurred when generating token."});
            };
            res.status(200).json({token});
        },
    );
};

const verifyUserToken = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        jwt.verify(req.token, process.env.SESSION_SECRET, (err) => {
            if (err) {
                res.status(403).json({ message: 'You are not authorized to perform this action.' });
            } else {
                next();
            };
        });
    } else {
        res.status(403).json({ message: 'You are not authorized to perform this action.' });
    }
};

const getLoggedUserInfo = (req, res) => {
    const bearerHeader = req.headers.authorization;
    if (bearerHeader) {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        const info = jwt.verify(req.token, process.env.SESSION_SECRET);
        return info;
    } else {
        res.status(403).json({ message: 'An error occurred while decoding.' });
    };
};

const usersLogout = (req, res) => {
    res.cookie("token", "").json({ message: 'Logout successful.'});
};

export {
    usersAllGet, 
    usersSearchNameGet, 
    usersSearchIdGet, 
    usersCreatePost, 
    usersUpdatePut, 
    usersDelete,
    usersLogin,
    usersLogout,
    verifyUserToken,
    getLoggedUserInfo
};