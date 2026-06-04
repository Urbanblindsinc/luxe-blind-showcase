
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

// Add routing debugging
console.log('Initializing application with environment:', {
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  baseUrl: import.meta.env.BASE_URL,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Analytics />
    <SpeedInsights />
  </React.StrictMode>,
)
