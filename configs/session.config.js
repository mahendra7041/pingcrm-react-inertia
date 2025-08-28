const sessionConfig = {
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000,
    secure: process.env.NODE_ENV === "production",
  },
};

export default sessionConfig;
