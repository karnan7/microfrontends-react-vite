import { lazy } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import TopBar from "./components/TopBar";
import RemoteSlot from "./components/RemoteSlot";
import RuntimeBar from "./components/RuntimeBar";
import { useCart } from "./state/cartContext";
import "./App.css";

// Federated modules. These specifiers resolve to nothing on disk — the
// federation runtime fetches them from the remotes listed in vite.config.ts
// when the import first runs, which is why they must be lazy.
const ProductGrid = lazy(() => import("products/ProductGrid"));
const CartPanel = lazy(() => import("cart/CartPanel"));

/**
 * The host shell: chrome, routing and the mount points remotes fill.
 * It renders no product or cart UI of its own — everything inside a
 * <RemoteSlot> is built, owned and deployed by another app.
 */
export default function App() {
  return (
    <div className="shell" data-origin="host">
      <TopBar />

      <main className="shell__main">
        <Routes>
          <Route path="/" element={<Navigate to="/catalog" replace />} />
          <Route path="/catalog" element={<CatalogRoute />} />
          <Route path="/cart" element={<CartRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <RuntimeBar />
    </div>
  );
}

/**
 * Both routes are the seam between shell and remote: they read the shell's
 * cart and hand the remote exactly what its props ask for. The remotes stay
 * presentational — neither one holds cart state, and neither knows the other
 * exists.
 */
function CatalogRoute() {
  const { add, inCart } = useCart();

  return (
    <RemoteSlot
      origin="products"
      module="products/ProductGrid"
      url="http://localhost:5001/remoteEntry.js"
    >
      <ProductGrid onAdd={add} inCart={inCart} />
    </RemoteSlot>
  );
}

function CartRoute() {
  const navigate = useNavigate();
  const { lines, setQty, remove, clear } = useCart();

  return (
    <RemoteSlot
      origin="cart"
      module="cart/CartPanel"
      url="http://localhost:5002/remoteEntry.js"
    >
      <CartPanel
        items={lines}
        onQty={setQty}
        onRemove={remove}
        onCheckout={() => {
          clear();
          navigate("/catalog");
        }}
        onBrowse={() => navigate("/catalog")}
      />
    </RemoteSlot>
  );
}

function NotFound() {
  return (
    <div className="notfound">
      <p className="label">404</p>
      <h1>No route here</h1>
      <p>The shell owns routing — this path isn&apos;t mapped to a remote.</p>
    </div>
  );
}
