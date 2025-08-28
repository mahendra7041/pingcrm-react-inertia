import passport from "passport";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import prisma from "../services/prisma.service.js";
import { excludeFields } from "./helper.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id },
      include: {
        account: true,
      },
    });

    return done(null, excludeFields(user, ["password", "remember_token"]));
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Invalid password" });
        }

        return done(null, excludeFields(user, ["password"]));
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
