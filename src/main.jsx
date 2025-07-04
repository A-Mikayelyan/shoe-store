import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';
import { DrawerProvider } from './context/CartDrawerContext';
import { SummaryDrawerProvider } from './context/SummaryDrawerContext';
import { CheckoutProvider } from './context/CheckoutContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <DrawerProvider>
          <SummaryDrawerProvider>
            <CartProvider>
              <CheckoutProvider>
                <App />
              </CheckoutProvider>
            </CartProvider>
          </SummaryDrawerProvider>
        </DrawerProvider>
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
