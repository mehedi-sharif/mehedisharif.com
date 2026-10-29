import { defineConfig } from "astro/config";
import base from "./astro.config.mjs";

export default defineConfig({
  ...base,
  output: "static",
  outDir: "./dist-cloudflare",
  adapter: undefined,
  image: undefined,
});
