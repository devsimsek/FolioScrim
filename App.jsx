import { Suspense, Component } from "react";
import Main from "./components/Main";
import { ThemeProvider } from "./components/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import StyleManager from "./components/StyleManager";
import SEOManager from "./components/SEOManager";
import { useConfig } from "./hooks/useConfig";

// Error Boundary Class Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem',
          textAlign: 'center',
          background: 'rgb(32, 33, 39)',
          color: '#fff'
        }}>
          <h1>Oops! Something went wrong</h1>
          <p style={{ color: '#918E9B', marginBottom: '2rem' }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.8rem 1.5rem',
              backgroundColor: '#61dafb',
              color: '#000',
              border: 'none',
              borderRadius: '0.4rem',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading Component
function LoadingSpinner() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'rgb(32, 33, 39)',
      color: '#fff'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid #918E9B',
        borderTop: '4px solid #61dafb',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
    </div>
  );
}

function AppContent() {
  const { getConfig } = useConfig();
  const showThemeToggle = getConfig('theme.allowThemeToggle', true);

  return (
    <ErrorBoundary>
      <SEOManager />
      <StyleManager />
      {showThemeToggle && (
        <div className="theme-toggle-container">
          <ThemeToggle />
        </div>
      )}
      <Suspense fallback={<LoadingSpinner />}>
        <Main />
      </Suspense>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
