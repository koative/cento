import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { readdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";
const entries = Object.fromEntries(
  readdirSync("themes")
    .filter((name) => existsSync(`themes/${name}/index.html`))
    .map((name) => [name, resolve(`themes/${name}/index.html`)]),
);
export default defineConfig({
  base: "/templates/",
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: { input: { gallery: resolve("index.html"), ...entries } },
  },
});
