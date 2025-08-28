import { RedisStore } from "connect-redis";
import { createClient } from "redis";

const redisClient = await createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

export const redisStore = new RedisStore({
  client: redisClient,
  prefix: "session:",
});
