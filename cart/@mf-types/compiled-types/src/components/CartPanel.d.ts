import { type CartLine } from '../data/lines';
import './CartPanel.css';
export type CartPanelProps = {
    /** Lines to render. Defaults to the local dummy fixture. */
    items?: CartLine[];
    /** Wire these to your own cart state. */
    onQty?: (id: string, qty: number) => void;
    onRemove?: (id: string) => void;
    onCheckout?: () => void;
    onBrowse?: () => void;
};
/**
 * The surface this remote exposes to the host.
 * Presentational only — totals are derived from the props it is given.
 */
export default function CartPanel({ items, onQty, onRemove, onCheckout, onBrowse, }: CartPanelProps): any;
