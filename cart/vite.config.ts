import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      // the name the host references this remote by
      name: "cart",
      // served at http://localhost:5002/remoteEntry.js
      filename: "remoteEntry.js",
      exposes: {
        // public contract of this microfrontend — the only file the host
        // may import. Everything else in src/ stays private to this app.
        "./CartPanel": "./src/components/CartPanel.tsx",
      },
      shared: {
        // singleton: one React instance across host + remotes. Two copies
        // means broken hooks and a duplicated reconciler.
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react/jsx-runtime": { singleton: true },
      },
      // CartPanel.css travels with the exposed module, so the component
      // styles itself when mounted inside the host
      bundleAllCSS: true,
    }),
  ],
  // build-time counterpart to server.origin below
  base: process.env.VITE_PUBLIC_URL ?? "http://localhost:5002/",
  server: {
    port: 5002,
    strictPort: true,
    // dev only: makes generated asset/chunk URLs absolute, so the host at
    // :5000 fetches them back from this remote instead of from itself
    origin: "http://localhost:5002",
    // the host is a different origin — it must be allowed to fetch remoteEntry
    cors: true,
  },
  preview: { port: 5002, strictPort: true },
});
