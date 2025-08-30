import express from "express";
import inertia from "express-inertia";
import session from "express-session";
import passport from "passport";
import router from "./app/router.js";
import inertiaConfig from "./configs/inertia.config.js";
import sessionConfig from "./configs/session.config.js";
import shareUser from "./app/middlewares/share-user.middleware.js";
import ValidationException from "./app/exceptions/validation.exception.js";
import UnAuthorizedException from "./app/exceptions/unauthorized.exception.js";
import HttpException from "./app/exceptions/http.exception.js";
import globalExceptionHandler from "./app/exceptions/global.exception.js";
import PrismaException from "./app/exceptions/prisma.exception.js";
import path from "path";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function bootstrap() {
  const app = express();
  const PORT = process.env.PORT || 5000;

  app.set("trust proxy", 1);

  app.use(express.static(path.resolve(__dirname, "public"), { index: false }));
  app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));

  app.use(express.json());
  app.use(session(sessionConfig));
  app.use(await inertia(inertiaConfig));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(shareUser);

  app.use(router);

  app.use(PrismaException.handler);
  app.use(ValidationException.handler);
  app.use(UnAuthorizedException.handler);
  app.use(HttpException.handler);
  app.use(globalExceptionHandler);

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

bootstrap().catch(console.error);
