import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root');
const loadingSpinner = document.getElementById('loading-spinner');

// Remove loading spinner when app loads
if (loadingSpinner) {
  loadingSpinner.style.display = 'none';
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
