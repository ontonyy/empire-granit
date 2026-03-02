import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { App } from './App';
import './styles.css';

function getBasename(): string | undefined {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base === '' ? undefined : base;
}

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container is missing');
}

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={getBasename()}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
