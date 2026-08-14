// `import type` matters here: a value import of a federated module would
// pull the remote over the network at startup. Types are erased at compile
// time, so this costs nothing at runtime.
import type { Product } from "products/ProductGrid";
import type { CartLine } from "cart/CartPanel";

export type CartAction =
  | { type: "add"; product: Product }
  | { type: "setQty"; id: string; qty: number }
  | { type: "remove"; id: string }
  | { type: "clear" };

const STORAGE_KEY = "mfe:cart";

/**
 * products/Product -> cart/CartLine.
 *
 * The two remotes describe the same object differently — Product carries
 * `category` and `note`, CartLine carries `qty` — and neither imports the
 * other. Translating between them is the shell's job, and it is the reason
 * the remotes stay independent.
 */
export function toCartLine(p: Product): CartLine {
  return {
    id: p.id,
    sku: p.sku,
    name: p.name,
    maker: p.maker,
    price: p.price,
    tone: p.tone,
    qty: 1,
  };
}

export function cartReducer(state: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case "add": {
      const existing = state.find((l) => l.id === action.product.id);
      // adding something already in the bag bumps the quantity rather than
      // appending a duplicate line
      if (existing) {
        return state.map((l) =>
          l.id === existing.id ? { ...l, qty: l.qty + 1 } : l,
        );
      }
      return [...state, toCartLine(action.product)];
    }

    case "setQty": {
      if (action.qty < 1) return state.filter((l) => l.id !== action.id);
      return state.map((l) =>
        l.id === action.id ? { ...l, qty: action.qty } : l,
      );
    }

    case "remove":
      return state.filter((l) => l.id !== action.id);

    case "clear":
      return [];
  }
}

function isCartLine(value: unknown): value is CartLine {
  const l = value as Partial<CartLine> | null;
  return (
    typeof l?.id === "string" &&
    typeof l.name === "string" &&
    typeof l.price === "number" &&
    typeof l.qty === "number"
  );
}

/**
 * Storage outlives deploys and is editable by hand, so what comes back is
 * untrusted input, not a CartLine[]. A blind `as CartLine[]` would push the
 * failure to render time; this drops anything that no longer fits.
 */
export function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isCartLine) : [];
  } catch {
    return [];
  }
}

export function saveCart(lines: CartLine[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // storage full or blocked (private mode) — the cart still works in memory
  }
}
