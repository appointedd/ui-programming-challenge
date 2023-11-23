/* eslint-env node */

import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: "inline",
  },
  server: {
    port: 3000,
  },
  plugins: [
    ...VitePluginNode({
      adapter: "fastify",
      appPath: "./src/server.ts",
      exportName: "server",
      tsCompiler: "swc",
    }),
  ],
});
