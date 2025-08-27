const inertiaConfig = {
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

export default inertiaConfig;
