import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  envPrefix: "RRC_",
  resolve: {
    alias: [
      { find: "@assets", replacement: path.resolve(__dirname, "./src/assets") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      {
        find: "@contexts",
        replacement: path.resolve(__dirname, "./src/contexts"),
      },
      { find: "@utils", replacement: path.resolve(__dirname, "./src/utils") },
    ],
  },
  assetsInclude: ["**/*.md"],
});
