import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./state/CartProvider.tsx";
import "./index.css";
import App from "./App.tsx";

// Composition root: providers get wired here, App stays a plain component.
// The router lives in the host and only in the host — remotes are plain
// components with no routes of their own, so they never need it, and never
// have to agree with the shell on a router version.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);
