import { RedisStore } from "connect-redis";
import { createClient } from "redis";

const sessionConfig = {
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: !!process.env.VERCEL,
  },
};

if (!process.env.VERCEL) {
  const redisClient = createClient({
    socket: {
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: Number(process.env.REDIS_PORT) || 6379,
    },
  });

  redisClient.on("error", (err) => console.log("Redis Client Error", err));

  redisClient.connect().then(() => {
    sessionConfig.store = new RedisStore({
      client: redisClient,
      prefix: "session:",
    });
    console.log(
      `Redis store attached for session at ${
        process.env.REDIS_HOST || "127.0.0.1"
      }:${process.env.REDIS_PORT || 6379}`
    );
  });
}

export default sessionConfig;
