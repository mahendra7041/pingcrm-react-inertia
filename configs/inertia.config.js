import path from "path";
import { fileURLToPath } from "node:url";
import { getManifestHash } from "../app/utils/helper.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const assetsVersion = getManifestHash();

const inertiaConfig = {
  rootElementId: "root",
  assetsVersion,
  ssrEnabled: true,
  ssrEntrypoint: path.resolve(__dirname, "../src/ssr.jsx"),
  ssrBuildEntrypoint: path.resolve(__dirname, "../build/ssr/ssr.js"),
};

export default inertiaConfig;
