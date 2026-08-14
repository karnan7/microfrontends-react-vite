/**
 * Dummy catalogue — static fixture data for the UI only.
 * Swap for a real fetch / store when wiring the app up.
 */

export type Product = {
  id: string
  sku: string
  name: string
  maker: string
  category: string
  price: number
  note: string
  /** hue used for the generated swatch, 0–360 */
  tone: number
  stock: 'in' | 'low' | 'out'
}

export const categories = [
  'All',
  'Desk',
  'Lighting',
  'Kitchen',
  'Paper',
  'Textiles',
] as const

export const catalog: Product[] = [
  {
    id: 'p-01',
    sku: 'ATL-1042',
    name: 'Brass Task Lamp',
    maker: 'Fenwick & Sons',
    category: 'Lighting',
    price: 148,
    note: 'Weighted base, stepless dimmer, 2700K',
    tone: 38,
    stock: 'in',
  },
  {
    id: 'p-02',
    sku: 'ATL-2317',
    name: 'Walnut Desk Tray',
    maker: 'Norr Workshop',
    category: 'Desk',
    price: 92,
    note: 'Oiled American walnut, felt lined',
    tone: 24,
    stock: 'in',
  },
  {
    id: 'p-03',
    sku: 'ATL-0884',
    name: 'Linen Bound Notebook',
    maker: 'Papeterie Blanc',
    category: 'Paper',
    price: 28,
    note: '192 pages, 100gsm, dot grid',
    tone: 205,
    stock: 'in',
  },
  {
    id: 'p-04',
    sku: 'ATL-3390',
    name: 'Ceramic Pour-Over',
    maker: 'Kōbo Studio',
    category: 'Kitchen',
    price: 64,
    note: 'Matte stoneware, 400ml, cone filter',
    tone: 158,
    stock: 'low',
  },
  {
    id: 'p-05',
    sku: 'ATL-1176',
    name: 'Merino Throw',
    maker: 'Highfield Mill',
    category: 'Textiles',
    price: 180,
    note: 'Woven in Yorkshire, 130 × 190cm',
    tone: 12,
    stock: 'in',
  },
  {
    id: 'p-06',
    sku: 'ATL-4501',
    name: 'Machined Pen No.4',
    maker: 'Grade Supply',
    category: 'Desk',
    price: 34,
    note: 'Anodised aluminium, refillable',
    tone: 220,
    stock: 'in',
  },
  {
    id: 'p-07',
    sku: 'ATL-2088',
    name: 'Stoneware Mug, Pair',
    maker: 'Kōbo Studio',
    category: 'Kitchen',
    price: 46,
    note: 'Reactive glaze — no two alike',
    tone: 96,
    stock: 'in',
  },
  {
    id: 'p-08',
    sku: 'ATL-1733',
    name: 'Leather Desk Mat',
    maker: 'Norr Workshop',
    category: 'Desk',
    price: 120,
    note: 'Full-grain, patinas with use',
    tone: 30,
    stock: 'out',
  },
  {
    id: 'p-09',
    sku: 'ATL-0620',
    name: 'Archive Folio, Set of 3',
    maker: 'Papeterie Blanc',
    category: 'Paper',
    price: 42,
    note: 'Acid-free board, cotton tie',
    tone: 268,
    stock: 'low',
  },
]
