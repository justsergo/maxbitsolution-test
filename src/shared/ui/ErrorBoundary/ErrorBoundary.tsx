import { Component } from 'react';
import type { ReactNode } from 'react';
import './ErrorBoundary.scss';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2 className="error-boundary__title">Что-то пошло не так</h2>
          <p className="error-boundary__message">
            Произошла ошибка при запросе к серверу
          </p>
          <button 
            className="error-boundary__button"
            onClick={() => window.location.reload()}
          >
            Обновить страницу
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
