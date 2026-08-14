import { lines as dummyLines, SHIPPING, type CartLine } from '../data/lines'
import './CartPanel.css'

export type CartPanelProps = {
  /** Lines to render. Defaults to the local dummy fixture. */
  items?: CartLine[]
  /** Wire these to your own cart state. */
  onQty?: (id: string, qty: number) => void
  onRemove?: (id: string) => void
  onCheckout?: () => void
  onBrowse?: () => void
}

const price = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 2 })}`

/**
 * The surface this remote exposes to the host.
 * Presentational only — totals are derived from the props it is given.
 */
export default function CartPanel({
  items = dummyLines,
  onQty,
  onRemove,
  onCheckout,
  onBrowse,
}: CartPanelProps) {
  const count = items.reduce((n, l) => n + l.qty, 0)
  const subtotal = items.reduce((n, l) => n + l.price * l.qty, 0)
  const shipping = items.length === 0 || subtotal > 250 ? 0 : SHIPPING
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <section className="cart cart--empty" data-origin="cart">
        <div className="cart__blank">
          <span className="cart__blank-mark" aria-hidden="true" />
          <h2>Your bag is empty</h2>
          <p>Pieces you add will be held here for 30 days.</p>
          <button type="button" className="btn" onClick={onBrowse}>
            Browse the catalogue
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="cart" data-origin="cart">
      <header className="cart__head">
        <div>
          <p className="label">Bag</p>
          <h1>
            {count} item{count === 1 ? '' : 's'}
          </h1>
        </div>
        <p className="cart__free mono">
          {shipping === 0
            ? 'Free shipping applied'
            : `${price(250 - subtotal)} to free shipping`}
        </p>
      </header>

      <div className="cart__cols">
        <ul className="cart__list">
          {items.map((l, i) => (
            <li
              key={l.id}
              className="line rise"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div
                className="line__swatch"
                style={{ ['--tone' as string]: l.tone }}
                aria-hidden="true"
              >
                <span>{l.name.charAt(0)}</span>
              </div>

              <div className="line__body">
                <p className="label">{l.maker}</p>
                <h3>{l.name}</h3>
                <p className="line__sku mono">{l.sku}</p>
              </div>

              <div className="stepper" aria-label={`Quantity for ${l.name}`}>
                <button
                  type="button"
                  aria-label="Decrease"
                  disabled={l.qty <= 1}
                  onClick={() => onQty?.(l.id, l.qty - 1)}
                >
                  &minus;
                </button>
                <span className="mono">{l.qty}</span>
                <button
                  type="button"
                  aria-label="Increase"
                  onClick={() => onQty?.(l.id, l.qty + 1)}
                >
                  +
                </button>
              </div>

              <div className="line__money">
                <span className="mono">{price(l.price * l.qty)}</span>
                <button
                  type="button"
                  className="line__remove"
                  onClick={() => onRemove?.(l.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        <aside className="summary panel">
          <p className="label">Summary</p>

          <dl className="summary__rows">
            <div>
              <dt>Subtotal</dt>
              <dd className="mono">{price(subtotal)}</dd>
            </div>
            <div>
              <dt>Shipping</dt>
              <dd className="mono">
                {shipping === 0 ? 'Free' : price(shipping)}
              </dd>
            </div>
            <div>
              <dt>Tax</dt>
              <dd className="mono summary__muted">At checkout</dd>
            </div>
          </dl>

          <div className="summary__total">
            <span>Total</span>
            <span className="mono">{price(total)}</span>
          </div>

          <button
            type="button"
            className="btn btn--primary summary__cta"
            onClick={onCheckout}
          >
            Checkout
          </button>
          <p className="summary__fine">
            Free returns within 30 days. Delivered in 2–4 working days.
          </p>
        </aside>
      </div>
    </section>
  )
}
