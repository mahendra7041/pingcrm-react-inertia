import express from "express";
import inertia from "express-inertia";
import session from "express-session";
import router from "./app/router.js";

async function bootstrap() {
  const app = express();
  const PORT = process.env.PORT || 5000;

  app.use(express.static("public"));
  app.use(express.json());
  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(
    await inertia({
      rootElementId: "root",
      ssrEnabled: true,
      ssrEntrypoint: "src/ssr.jsx",
      ssrBuildEntrypoint: "build/ssr/ssr.jsx",
    })
  );

  app.use(router);

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

bootstrap().catch(console.error);
