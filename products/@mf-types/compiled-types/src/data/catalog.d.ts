/**
 * Dummy catalogue — static fixture data for the UI only.
 * Swap for a real fetch / store when wiring the app up.
 */
export type Product = {
    id: string;
    sku: string;
    name: string;
    maker: string;
    category: string;
    price: number;
    note: string;
    /** hue used for the generated swatch, 0–360 */
    tone: number;
    stock: 'in' | 'low' | 'out';
};
export declare const categories: readonly ["All", "Desk", "Lighting", "Kitchen", "Paper", "Textiles"];
export declare const catalog: Product[];
