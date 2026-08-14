import { Component, Suspense, type ReactNode } from "react";

export type RemoteSlotProps = {
  /** Which microfrontend owns this region. */
  origin: "products" | "cart";
  /** The federated module mounted here. */
  module: string;
  /** Where that module is served from. */
  url: string;
  children: ReactNode;
};

/**
 * A mount point for a remote.
 *
 * A remote is fetched over the network at runtime, so two things the host
 * never worries about for its own code become its problem here:
 * the module takes time to arrive (Suspense), and it may not arrive at all
 * if the remote is down or was deployed broken (the error boundary).
 *
 * The boundary is per-slot on purpose — a dead remote blanks its own region,
 * not the whole page.
 */
export default function RemoteSlot({
  origin,
  module,
  url,
  children,
}: Readonly<RemoteSlotProps>) {
  return (
    <div className="slot" data-slot={origin}>
      <div className="slot__meta">
        <span className="slot__id">
          <i className="dot" />
          <span className="mono">{module}</span>
        </span>
        <span className="slot__url mono">{url}</span>
        <span className="slot__status label">federated</span>
      </div>

      <RemoteErrorBoundary key={module} module={module} url={url}>
        <Suspense fallback={<RemoteSkeleton />}>{children}</Suspense>
      </RemoteErrorBoundary>
    </div>
  );
}

function RemoteSkeleton() {
  return (
    <div className="skeleton" aria-busy="true" aria-live="polite">
      <span className="skeleton__bar skeleton__bar--head" />
      <div className="skeleton__grid">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className="skeleton__tile" />
        ))}
      </div>
      <span className="label">fetching remote</span>
    </div>
  );
}

type BoundaryProps = { module: string; url: string; children: ReactNode };
type BoundaryState = { error: Error | null };

class RemoteErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): BoundaryState {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="slot__down" role="alert">
        <p className="label">Remote unavailable</p>
        <h2>{this.props.module} could not be loaded</h2>
        <p className="slot__down-why">
          Nothing answered at <span className="mono">{this.props.url}</span>.
          The rest of the page is unaffected.
        </p>
        <pre className="slot__down-err mono">{error.message}</pre>

        <button
          type="button"
          className="btn"
          onClick={() => window.location.reload()}
        >
          Reload page
        </button>
      </div>
    );
  }
}
