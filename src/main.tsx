import React, {StrictMode, ErrorInfo, ReactNode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    (this as any).state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    const state = (this as any).state;
    const props = (this as any).props;
    if (state.hasError) {
      return (
        <div style={{ padding: '20px', backgroundColor: '#fff', color: '#000', fontFamily: 'monospace', margin: '20px', border: '2px solid red', borderRadius: '8px', zIndex: 9999, position: 'relative' }}>
          <h2 style={{ color: 'red', marginBottom: '10px' }}>Что-то пошло не так при загрузке приложения:</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <strong>{state.error && state.error.toString()}</strong>
            <br /><br />
            {state.error && state.error.stack}
          </details>
        </div>
      );
    }

    return props.children;
  }
}

// Global window errors
window.addEventListener('error', (event) => {
  if (event.message && (event.message.indexOf('WebSocket') !== -1 || event.message.indexOf('vite') !== -1 || event.message.indexOf('HMR') !== -1)) {
    return;
  }
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="padding: 20px; background-color: #fff; color: #000; font-family: monospace; margin: 20px; border: 2px solid red; border-radius: 8px; z-index: 9999; position: relative;">
        <h2 style="color: red; margin-bottom: 10px;">Глобальная ошибка JavaScript (Global Error):</h2>
        <pre style="white-space: pre-wrap; font-weight: bold;">${event.message}</pre>
        <pre style="white-space: pre-wrap;">Файл: ${event.filename}:${event.lineno}:${event.colno}</pre>
        <pre style="white-space: pre-wrap;">${event.error ? event.error.stack : ''}</pre>
      </div>
    `;
  }
});

// Promise rejections
window.addEventListener('unhandledrejection', (event) => {
  const reasonStr = event.reason ? String(event.reason.message || event.reason) : '';
  if (reasonStr.indexOf('WebSocket') !== -1 || reasonStr.indexOf('vite') !== -1 || reasonStr.indexOf('HMR') !== -1) {
    return;
  }
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="padding: 20px; background-color: #fff; color: #000; font-family: monospace; margin: 20px; border: 2px solid red; border-radius: 8px; z-index: 9999; position: relative;">
        <h2 style="color: red; margin-bottom: 10px;">Необработанное отклонение промиса (Promise Rejection):</h2>
        <pre style="white-space: pre-wrap; font-weight: bold;">${reasonStr}</pre>
      </div>
    `;
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

