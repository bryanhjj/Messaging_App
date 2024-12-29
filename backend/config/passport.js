import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

passport.serializeUser((user, done) => {
    done(null, { userId: user.id, username: user.username });
});
    
passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findFirst(
            { where: { id } },
        );
        done(null, user);
    } catch(err) {
        done(err);
    }
});

passport.use(
    new LocalStrategy (async (email, password, done) => {
        const user = await prisma.user.findFirst(
            { where: { email: email } },
        );
        const match = await bcrypt.compare(password, user.password);
        if (!user) {
            return done(null, false, { message: "Incorrect email" });
        }
        if (!match) {
            return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
    })
);

export default passport;