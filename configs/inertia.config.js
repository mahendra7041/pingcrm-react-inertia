import path from "path";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inertiaConfig = {
  rootElementId: "root",
  clientStaticBuildDir: path.resolve(__dirname, "../build/client"),
  ssrEnabled: true,
  ssrEntrypoint: path.resolve(__dirname, "../src/ssr.jsx"),
  ssrBuildEntrypoint: path.resolve(__dirname, "../build/ssr/ssr.js"),
};

export default inertiaConfig;
