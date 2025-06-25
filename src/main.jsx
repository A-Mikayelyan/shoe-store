import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
// import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { DrawerProvider } from './context/CartDrawerContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <ThemeProvider> */}
        <FavoritesProvider>
          <DrawerProvider>
            
          <CartProvider>
          <App />
          </CartProvider>
          
          </DrawerProvider>
        </FavoritesProvider>
      {/* </ThemeProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
