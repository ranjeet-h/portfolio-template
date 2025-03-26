import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';

// Create a dynamic import for the App component for initial load optimization
const AppComponent = lazy(() => import('./App'));

// Basic loading spinner for the entire app
const AppLoadingSpinner = () => (
  <div className="app-loading-container" style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#1a1a1a'
  }}>
    <div className="app-loader" style={{
      width: '50px',
      height: '50px',
      border: '5px solid #333',
      borderBottomColor: '#fff',
      borderRadius: '50%',
      animation: 'loader-spin 1s linear infinite'
    }} />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<AppLoadingSpinner />}>
        <AppComponent />
      </Suspense>
    </Provider>
  </React.StrictMode>
);

// Measure and report web vitals for performance tracking
reportWebVitals(console.log);

// Preload critical resources after initial render is complete
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(() => {
    // Preload fonts, critical images, etc. during browser idle time
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'font';
    preloadLink.href = '/fonts/main-font.woff2'; // Change to actual font path
    preloadLink.type = 'font/woff2';
    preloadLink.crossOrigin = 'anonymous';
    document.head.appendChild(preloadLink);
  });
}
