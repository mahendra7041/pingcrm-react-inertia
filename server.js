import express from "express";
import { inertiaMiddleware } from "express-inertia";
import { createServer } from "vite";

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
    vite = await createServer({
      server: { middlewareMode: true },
      appType: "custom",
    });

    app.use(vite.middlewares);
  }

  app.use(express.static("public"));

  const config = {
    rootElementId: "root",
    encryptHistory: true,
    client: {
      entrypoint: "index.html",
      bundle: "build/client/index.html",
    },
    ssr: {
      entrypoint: "src/ssr.jsx",
      bundle: "build/ssr/ssr.js",
    },
  };

  app.use(inertiaMiddleware(config, vite));

  app.get("/", (req, res) => {
    res.inertia.render("home");
  });

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

bootstrap().catch(console.error);
