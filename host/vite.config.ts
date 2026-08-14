import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

// Where the remotes are served from. Defaults are the dev ports; CI overrides
// them with the deployed paths. No trailing slash — "/remoteEntry.js" is
// appended below, and the values are shown verbatim in the UI.
const PRODUCTS_URL = process.env.VITE_PRODUCTS_URL ?? "http://localhost:5001";
const CART_URL = process.env.VITE_CART_URL ?? "http://localhost:5002";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      // the host exposes nothing — it only consumes
      remotes: {
        products: {
          // "module" for Vite-built remotes; the default "var" expects a
          // global variable, which is a webpack-era format
          type: "module",
          name: "products",
          entry: `${PRODUCTS_URL}/remoteEntry.js`,
        },
        cart: {
          type: "module",
          name: "cart",
          entry: `${CART_URL}/remoteEntry.js`,
        },
      },
      shared: {
        // must match the remotes' shared config — one React for everyone
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react/jsx-runtime": { singleton: true },
      },
    }),
  ],
  // The host is the page itself, so this is a path, not an absolute URL —
  // the router reads it back as import.meta.env.BASE_URL for its basename.
  base: process.env.VITE_BASE_PATH ?? "/",
  // Hand the same URLs to the client so the slot headers and the "remote
  // unavailable" message name the address actually being fetched.
  define: {
    __PRODUCTS_URL__: JSON.stringify(`${PRODUCTS_URL}/remoteEntry.js`),
    __CART_URL__: JSON.stringify(`${CART_URL}/remoteEntry.js`),
  },
  server: { port: 5000, strictPort: true },
  preview: { port: 5000, strictPort: true },
});
