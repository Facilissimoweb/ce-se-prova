import React from 'react';

type Props = {
  children: React.ReactNode;
  /** Remount key — bump after recovery so GT-mutated DOM is discarded. */
  resetKey?: string | number;
  /** Called when a render/commit error is caught (e.g. GT removeChild). */
  onError?: () => void;
  fallback?: React.ReactNode;
};

type State = { hasError: boolean };

/**
 * Catches React DOM reconciliation crashes (common when Google Translate
 * wraps text in `<font>` and React later updates those nodes). Prevents a
 * blank/black full-page unmount; parent should remount clean Italian source.
 */
export class GtSafeBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(): void {
    this.props.onError?.();
  }

  componentDidUpdate(prevProps: Props): void {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
