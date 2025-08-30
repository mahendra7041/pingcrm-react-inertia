import path from "path";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inertiaConfig = {
  rootElementId: "root",
  ssrEnabled: true,
  ssrEntrypoint: path.resolve(__dirname, "../src/ssr.jsx"),
  ssrBuildEntrypoint: path.resolve(__dirname, "../ssr/ssr.js"),
};

export default inertiaConfig;
