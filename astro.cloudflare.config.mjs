import { builtinModules } from "node:module";
import cloudflare from "@astrojs/cloudflare";
import { defineConfig } from "astro/config";
import base from "./astro.config.mjs";

export default defineConfig({
  ...base,
  output: "hybrid",
  outDir: "./dist-cloudflare",
  adapter: cloudflare({ imageService: "compile" }),
  image: undefined,
  vite: {
    resolve: {
      alias: builtinModules
        .filter((name) => !name.startsWith("node:"))
        .map((name) => ({
          find: new RegExp(`^${name}$`),
          replacement: `node:${name}`,
        })),
    },
    ssr: { external: builtinModules.flatMap((name) => [name, `node:${name}`]) },
  },
});
