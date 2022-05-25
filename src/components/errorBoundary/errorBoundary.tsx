import { Component } from 'react';
import ErrorMessage from './errorMessage';
import { ErrorBoundaryProps, ErrorBoundaryState } from './errorBoundaryTypes';

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <ErrorMessage />;
    }
    return children;
  }
}
