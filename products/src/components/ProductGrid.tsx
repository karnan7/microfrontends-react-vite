import { useState } from 'react'
import { catalog, categories, type Product } from '../data/catalog'
import './ProductGrid.css'

export type ProductGridProps = {
  /** Catalogue to render. Defaults to the local dummy fixture. */
  products?: Product[]
  /** Fired when a product is added. Wire this to your own cart state. */
  onAdd?: (product: Product) => void
  /** Quantity already in the cart, keyed by product id — display only. */
  inCart?: Record<string, number>
}

const price = (n: number) => `$${n.toLocaleString('en-US')}`

const stockLabel: Record<Product['stock'], string> = {
  in: 'In stock',
  low: 'Low stock',
  out: 'Sold out',
}

/**
 * The surface this remote exposes to the host.
 * Presentational only — it owns no data beyond the active filter.
 */
export default function ProductGrid({
  products = catalog,
  onAdd,
  inCart = {},
}: ProductGridProps) {
  const [filter, setFilter] = useState<string>('All')

  const visible =
    filter === 'All' ? products : products.filter((p) => p.category === filter)

  return (
    <section className="pg" data-origin="products">
      <header className="pg__head">
        <div>
          <p className="label">Catalogue</p>
          <h1>Objects for the desk</h1>
        </div>
        <p className="pg__count mono">
          {String(visible.length).padStart(2, '0')} / {products.length} items
        </p>
      </header>

      <div className="pg__filters" role="group" aria-label="Filter by category">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className="chip"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="pg__grid">
        {visible.map((p, i) => (
          <li
            key={p.id}
            className="card rise"
            style={{ animationDelay: `${i * 45}ms` }}
          >
            <div
              className="card__swatch"
              style={{ ['--tone' as string]: p.tone }}
              aria-hidden="true"
            >
              <span className="card__mark">{p.name.charAt(0)}</span>
              <span className="card__sku mono">{p.sku}</span>
            </div>

            <div className="card__body">
              <p className="card__maker label">{p.maker}</p>
              <h3>{p.name}</h3>
              <p className="card__note">{p.note}</p>
            </div>

            <div className="card__foot">
              <span className="card__price mono">{price(p.price)}</span>
              <button
                type="button"
                className="btn btn--sm"
                disabled={p.stock === 'out'}
                onClick={() => onAdd?.(p)}
              >
                {inCart[p.id] ? `In cart · ${inCart[p.id]}` : 'Add'}
              </button>
            </div>

            <span className={`card__stock card__stock--${p.stock}`}>
              <i className={`dot ${p.stock === 'out' ? 'dot--idle' : ''}`} />
              {stockLabel[p.stock]}
            </span>
          </li>
        ))}
      </ul>

      {visible.length === 0 && (
        <p className="pg__empty">Nothing in {filter} just yet.</p>
      )}
    </section>
  )
}
