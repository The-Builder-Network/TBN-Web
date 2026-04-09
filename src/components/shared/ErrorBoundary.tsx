import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  /** Optional label shown in the fallback heading (e.g. "this page") */
  name?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  eventId: string | null;
}

/**
 * React class error boundary.
 * Catches uncaught render / lifecycle errors in its subtree and shows a
 * friendly fallback UI.  If window.__Sentry is present (e.g. loaded via
 * @sentry/react in the future) the event is captured automatically.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, eventId: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, eventId: null };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Forward to Sentry if available (opt-in, no hard import)
    const sentry = (
      window as unknown as {
        __Sentry?: { captureException: (e: Error, ctx?: unknown) => string };
      }
    ).__Sentry;
    if (sentry) {
      const eventId = sentry.captureException(error, { extra: info });
      this.setState({ eventId });
    } else {
      // eslint-disable-next-line no-console
      console.error("[ErrorBoundary]", error, info);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, eventId: null });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    const { name = "this section" } = this.props;

    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="rounded-full bg-destructive/10 p-4">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Something went wrong</h2>
          <p className="text-muted-foreground text-sm">
            An unexpected error occurred in {name}. Our team has been notified.
          </p>
          {this.state.eventId && (
            <p className="text-muted-foreground text-xs">
              Reference: <code>{this.state.eventId}</code>
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={this.handleReset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.location.assign("/")}
          >
            Go home
          </Button>
        </div>
      </div>
    );
  }
}
