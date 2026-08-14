/**
 * Dummy cart contents — static fixture data for the UI only.
 * Replace with whatever the host hands down once state is wired.
 */
export type CartLine = {
    id: string;
    sku: string;
    name: string;
    maker: string;
    price: number;
    qty: number;
    /** hue used for the generated swatch, 0–360 */
    tone: number;
};
export declare const lines: CartLine[];
export declare const SHIPPING = 12;
