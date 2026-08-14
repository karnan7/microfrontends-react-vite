/**
 * Dummy cart contents — static fixture data for the UI only.
 * Replace with whatever the host hands down once state is wired.
 */

export type CartLine = {
  id: string
  sku: string
  name: string
  maker: string
  price: number
  qty: number
  /** hue used for the generated swatch, 0–360 */
  tone: number
}

export const lines: CartLine[] = [
  {
    id: 'p-01',
    sku: 'ATL-1042',
    name: 'Brass Task Lamp',
    maker: 'Fenwick & Sons',
    price: 148,
    qty: 1,
    tone: 38,
  },
  {
    id: 'p-03',
    sku: 'ATL-0884',
    name: 'Linen Bound Notebook',
    maker: 'Papeterie Blanc',
    price: 28,
    qty: 3,
    tone: 205,
  },
  {
    id: 'p-07',
    sku: 'ATL-2088',
    name: 'Stoneware Mug, Pair',
    maker: 'Kōbo Studio',
    price: 46,
    qty: 1,
    tone: 96,
  },
]

export const SHIPPING = 12
