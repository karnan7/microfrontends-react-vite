import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../state/cartContext";

const nav = [
  { to: "/catalog", label: "Catalogue", origin: "products" },
  { to: "/cart", label: "Bag", origin: "cart" },
];

export default function TopBar() {
  // shell chrome reads the shell's own state directly — no props needed
  const { count } = useCart();
  const [dark, setDark] = useState(
    () => document.documentElement.dataset.theme === "dark",
  );
  const [bounds, setBounds] = useState(() =>
    document.documentElement.classList.contains("boundaries"),
  );

  const toggleTheme = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("mfe:theme", next);
    setDark(!dark);
  };

  const toggleBounds = () => {
    document.documentElement.classList.toggle("boundaries", !bounds);
    localStorage.setItem("mfe:boundaries", bounds ? "0" : "1");
    setBounds(!bounds);
  };

  return (
    <header className="topbar">
      <Link className="brand" to="/">
        <span className="brand__mark" aria-hidden="true" />
        <span className="brand__name">Atelier</span>
        <span className="brand__sep" aria-hidden="true" />
        <span className="label">Host shell</span>
      </Link>

      <nav className="tabs" aria-label="Sections">
        {nav.map((n) => (
          // NavLink sets aria-current="page" on the active route, which is
          // what the styling keys off — no active state of our own.
          <NavLink key={n.to} to={n.to} className="tab" data-serves={n.origin}>
            {n.label}
            {n.to === "/cart" && count > 0 && (
              <span className="tab__badge mono">{count}</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="topbar__actions">
        <button
          type="button"
          className="btn btn--sm btn--ghost"
          aria-pressed={bounds}
          onClick={toggleBounds}
          title="Outline which microfrontend owns each region"
        >
          Boundaries
        </button>
        <button
          type="button"
          className="btn btn--sm btn--ghost"
          onClick={toggleTheme}
        >
          {dark ? "Light" : "Dark"}
        </button>
      </div>
    </header>
  );
}
