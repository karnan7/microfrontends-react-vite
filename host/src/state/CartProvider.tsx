import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { Product } from "products/ProductGrid";
import { cartReducer, loadCart, saveCart } from "./cart";
import { CartContext, type CartValue } from "./cartContext";

/**
 * The cart belongs to the shell.
 *
 * Two remotes need it — products reads it to label its buttons, cart reads
 * and writes it — so it cannot live in either one without making them depend
 * on each other. State shared by two microfrontends is the shell's state
 * (or the server's), never a remote's.
 *
 * It sits in context rather than App's props because TopBar and both routes
 * all read it, from different depths.
 */
export function CartProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [lines, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => saveCart(lines), [lines]);

  const add = useCallback(
    (product: Product) => dispatch({ type: "add", product }),
    [],
  );
  const setQty = useCallback(
    (id: string, qty: number) => dispatch({ type: "setQty", id, qty }),
    [],
  );
  const remove = useCallback(
    (id: string) => dispatch({ type: "remove", id }),
    [],
  );
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const value = useMemo<CartValue>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      inCart: Object.fromEntries(lines.map((l) => [l.id, l.qty])),
      add,
      setQty,
      remove,
      clear,
    }),
    [lines, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
