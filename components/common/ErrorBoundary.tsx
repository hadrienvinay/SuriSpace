'use client';
import React from 'react';

interface Props {
  children: React.ReactNode;
  /** Shown when the child tree throws. Defaults to a small inline error pill. */
  fallback?: React.ReactNode;
  /** Label shown in the default fallback (e.g. "Météo", "Transports") */
  label?: string;
}

interface State { hasError: boolean }

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="text-xs text-gray-600 text-center py-2 italic">
          {this.props.label ? `${this.props.label} indisponible` : 'Indisponible'}
        </div>
      );
    }
    return this.props.children;
  }
}
