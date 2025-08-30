import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

export function excludeFields(inputObject, excludedKeys) {
  const result = {};
  Object.keys(inputObject).forEach((key) => {
    if (!excludedKeys.includes(key)) {
      Object.assign(result, { [key]: inputObject[key] });
    }
  });
  return result;
}

export function getManifestHash() {
  try {
    if (process.env.NODE_ENV !== "production") return "v1";
    const manifestFile = fs.readFileSync(
      path.resolve("public/.vite/manifest.json"),
      "utf-8"
    );

    return createHash("md5").update(manifestFile).digest("hex");
  } catch {
    return "v1";
  }
}
