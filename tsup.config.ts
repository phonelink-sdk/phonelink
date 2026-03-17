import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "expo/index": "src/expo/index.ts",
    "validate/index": "src/validate/index.ts",
    "web/index": "src/web/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  external: ["expo-crypto", "expo-web-browser", "react"],
});
