import { version as reactVersion } from 'react'

/** Static placeholders — swap for real remote health once federation is on. */
const apps = [
  { name: 'host', role: 'shell', port: 5000, exposes: '—' },
  { name: 'products', role: 'remote', port: 5001, exposes: './ProductGrid' },
  { name: 'cart', role: 'remote', port: 5002, exposes: './CartPanel' },
]

export default function RuntimeBar() {
  return (
    <footer className="runtime">
      <div className="runtime__apps">
        {apps.map((a) => (
          <div key={a.name} className="runtime__app" data-app={a.name}>
            <i className="dot" />
            <span className="runtime__name">{a.name}</span>
            <span className="label">{a.role}</span>
            <span className="runtime__port mono">:{a.port}</span>
            <span className="runtime__exposes mono">{a.exposes}</span>
          </div>
        ))}
      </div>

      <p className="runtime__note mono">
        react {reactVersion} · shared singleton
      </p>
    </footer>
  )
}
