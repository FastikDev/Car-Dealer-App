import React, { Component, ReactNode } from 'react';
import ErrorComponent from '../ErrorComponent';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  hahdleReaload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return <ErrorComponent />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
