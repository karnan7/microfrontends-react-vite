import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

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
          entry: `${process.env.VITE_PRODUCTS_URL ?? "http://localhost:5001"}/remoteEntry.js`,
        },
        cart: {
          type: "module",
          name: "cart",
          entry: `${process.env.VITE_CART_URL ?? "http://localhost:5002"}/remoteEntry.js`,
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
  server: { port: 5000, strictPort: true },
  preview: { port: 5000, strictPort: true },
});
