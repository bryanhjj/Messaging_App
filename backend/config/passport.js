import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

passport.use(
    new LocalStrategy (
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                const user = await prisma.user.findUnique(
                    { where: { email: email }, }
                );
                if (!user) {
                    return done(null, false, { message: "Incorrect email" });
                }
                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    return done(null, false, { message: "Incorrect password" });
                }
                console.log("Login successful. Welcome ", user.username);
                return done(null, user);
            } catch (err) {
                console.error("Error during local authentication:", err);
                return done(err);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});
    
passport.deserializeUser(async (id, done) => {
    try {
        const userDetails = await prisma.user.findFirst(
            { where: { id: id } },
        );
        done(null, userDetails);
    } catch(err) {
        done(err);
    }
});

export default passport;