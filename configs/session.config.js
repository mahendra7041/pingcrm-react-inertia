import { RedisStore } from "connect-redis";
import { createClient } from "redis";

const sessionConfig = {
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: !!process.env.VERCEL,
  },
};

if (!process.env.VERCEL) {
  const redisClient = createClient();

  redisClient.on("error", (err) => console.log("Redis Client Error", err));

  redisClient.connect().then(() => {
    sessionConfig.store = new RedisStore({
      client: redisClient,
      prefix: "session:",
    });
    console.log("Redis store attached for session");
  });
}

export default sessionConfig;
