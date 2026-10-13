/**
 * main.jsx — Application entry point.
 *
 * React concept: The entry point
 * React needs a single HTML element to "mount" into.
 * We target the <div id="root"> in index.html.
 * createRoot() sets up React's rendering engine.
 * .render(<App />) kicks off the entire component tree.
 *
 * StrictMode: a development-only wrapper that helps
 * catch potential bugs by rendering components twice
 * (only in development — production is unaffected).
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
