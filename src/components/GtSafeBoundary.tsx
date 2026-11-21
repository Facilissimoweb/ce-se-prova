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
 *
 * ENN-182 — when `resetKey` changes after an error, clear `hasError` so SPA
 * Traduci / Maggiori module switches recover without a full page reload.
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
    if (prevProps.resetKey === this.props.resetKey) return;
    // Always discard error state on remount key — Maggiori list+article SPA path.
    if (this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    // Remount on resetKey so GT `<font>` wrappers are discarded (ENN-164 / 182).
    if (this.props.resetKey !== undefined && this.props.resetKey !== null) {
      return (
        <React.Fragment key={String(this.props.resetKey)}>
          {this.props.children}
        </React.Fragment>
      );
    }
    return this.props.children;
  }
}
