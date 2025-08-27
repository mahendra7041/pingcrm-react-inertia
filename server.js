import express from "express";
import { inertiaMiddleware } from "express-inertia";
import { createServer as createViteServer } from "vite";
import inertiaConfig from "./configs/inertia.config.js";
import router from "./app/router.js";
import viteConfig from "./configs/vite.config.js";

async function bootstrap() {
  const app = express();
  const PORT = process.env.PORT || 5000;
  let vite;

  if (process.env.NODE_ENV === "production") {
    app.use(
      express.static("build/client", {
        index: false,
      })
    );
  } else {
    vite = await createViteServer(viteConfig);
    app.use(vite.middlewares);
  }

  app.use(express.static("public"));
  app.use(express.json());
  app.use(inertiaMiddleware(inertiaConfig, vite));

  app.use(router);

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

bootstrap().catch(console.error);
