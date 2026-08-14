/**
 * Injected at build time by `define` in vite.config.ts, so the UI can show
 * where each remote is actually being fetched from rather than a hardcoded
 * dev URL that would be wrong in every other environment.
 */
declare const __PRODUCTS_URL__: string;
declare const __CART_URL__: string;
