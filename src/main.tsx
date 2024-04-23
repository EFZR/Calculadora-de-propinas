import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import OrderProvider from './context/orderProvider.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <OrderProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </OrderProvider>
)
