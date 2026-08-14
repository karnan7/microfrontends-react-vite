import { createContext, use } from "react";
import type { Product } from "products/ProductGrid";
import type { CartLine } from "cart/CartPanel";

export type CartValue = {
  lines: CartLine[];
  count: number;
  /** qty per product id — what ProductGrid needs to label its buttons */
  inCart: Record<string, number>;
  add: (product: Product) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const CartContext = createContext<CartValue | null>(null);

export function useCart(): CartValue {
  const value = use(CartContext);
  if (!value) throw new Error("useCart must be used inside <CartProvider>");
  return value;
}
