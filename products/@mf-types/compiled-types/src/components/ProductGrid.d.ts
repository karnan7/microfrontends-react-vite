import { type Product } from '../data/catalog';
import './ProductGrid.css';
export type ProductGridProps = {
    /** Catalogue to render. Defaults to the local dummy fixture. */
    products?: Product[];
    /** Fired when a product is added. Wire this to your own cart state. */
    onAdd?: (product: Product) => void;
    /** Quantity already in the cart, keyed by product id — display only. */
    inCart?: Record<string, number>;
};
/**
 * The surface this remote exposes to the host.
 * Presentational only — it owns no data beyond the active filter.
 */
export default function ProductGrid({ products, onAdd, inCart, }: ProductGridProps): import("react").JSX.Element;
