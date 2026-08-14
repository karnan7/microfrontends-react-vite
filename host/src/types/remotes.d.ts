/**
 * Type contracts for the federated modules this host consumes.
 *
 * TypeScript can't follow `import('products/ProductGrid')` — that specifier
 * is resolved by the federation runtime in the browser, not by the compiler.
 * These declarations are the host's copy of each remote's public API, and
 * they must be kept in step with the remote by hand.
 *
 * (The plugin can generate these for you instead via its `dts` option, which
 * pulls types from the running remote. Hand-written here so the contract is
 * visible and the build works offline.)
 */

declare module "products/ProductGrid" {
  export type Product = {
    id: string;
    sku: string;
    name: string;
    maker: string;
    category: string;
    price: number;
    note: string;
    tone: number;
    stock: "in" | "low" | "out";
  };

  export type ProductGridProps = {
    products?: Product[];
    onAdd?: (product: Product) => void;
    inCart?: Record<string, number>;
  };

  const ProductGrid: import("react").ComponentType<ProductGridProps>;
  export default ProductGrid;
}

declare module "cart/CartPanel" {
  export type CartLine = {
    id: string;
    sku: string;
    name: string;
    maker: string;
    price: number;
    qty: number;
    tone: number;
  };

  export type CartPanelProps = {
    items?: CartLine[];
    onQty?: (id: string, qty: number) => void;
    onRemove?: (id: string) => void;
    onCheckout?: () => void;
    onBrowse?: () => void;
  };

  const CartPanel: import("react").ComponentType<CartPanelProps>;
  export default CartPanel;
}
