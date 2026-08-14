import { useState } from 'react'
import CartPanel from './components/CartPanel'
import './App.css'

/**
 * Standalone shell for the cart remote.
 *
 * Only rendered when this app runs on its own (npm run dev → :5002).
 * The host never sees any of this — it mounts <CartPanel /> directly.
 */
export default function App() {
  const [dark, setDark] = useState(
    () => document.documentElement.dataset.theme === 'dark',
  )
  const [bounds, setBounds] = useState(() =>
    document.documentElement.classList.contains('boundaries'),
  )
  const [empty, setEmpty] = useState(false)

  const toggleTheme = () => {
    const next = dark ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    localStorage.setItem('mfe:theme', next)
    setDark(!dark)
  }

  const toggleBounds = () => {
    document.documentElement.classList.toggle('boundaries', !bounds)
    localStorage.setItem('mfe:boundaries', bounds ? '0' : '1')
    setBounds(!bounds)
  }

  return (
    <div className="standalone">
      <header className="standalone__bar">
        <span className="standalone__id">
          <i className="dot" />
          <b>cart</b>
          <span className="label">remote</span>
        </span>

        <p className="standalone__hint">
          Running standalone. Exposes <code className="mono">./CartPanel</code>
        </p>

        <div className="standalone__actions">
          <button
            type="button"
            className="btn btn--sm btn--ghost"
            aria-pressed={empty}
            onClick={() => setEmpty(!empty)}
          >
            Empty state
          </button>
          <button
            type="button"
            className="btn btn--sm btn--ghost"
            aria-pressed={bounds}
            onClick={toggleBounds}
          >
            Boundaries
          </button>
          <button
            type="button"
            className="btn btn--sm btn--ghost"
            onClick={toggleTheme}
          >
            {dark ? 'Light' : 'Dark'}
          </button>
        </div>
      </header>

      <main className="standalone__main">
        <CartPanel items={empty ? [] : undefined} />
      </main>
    </div>
  )
}
