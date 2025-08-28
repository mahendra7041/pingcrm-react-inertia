import { redisStore } from "../app/utils/redis.js";

const sessionConfig = {
  store: redisStore,
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: false,
  },
};

export default sessionConfig;
