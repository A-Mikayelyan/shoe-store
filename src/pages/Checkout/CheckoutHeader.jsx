import React from 'react';
import { useLocation } from 'react-router-dom';
import './CheckoutHeader.css';
import { useCart } from '../../context/CartContext';

const CheckoutHeader = () => {
  const location = useLocation();
  const {cart} = useCart();

  const getCurrentStep = () => {
    if (location.pathname.includes('/checkout/shipping')) return 2;
    if (location.pathname.includes('/checkout/payment')) return 3;
    if (location.pathname.includes('/checkout/review')) return 4;
    return 1;
  };

  const step = getCurrentStep();

  return (
    <header className="checkout-header">
      <nav className="step-bar">
        <ul className="step-list">
          <li className={step === 1 ? 'active' : ''} data-step="1">Login</li>
          <li className={step === 2 ? 'active' : ''} data-step="2">Shipping</li>
          <li className={step === 3 ? 'active' : ''} data-step="3">Payment</li>
          <li className={step === 4 ? 'active' : ''} data-step="4">Review</li>
        </ul>
      </nav>
      <div className='prod-quantity'>
        {cart.length} PRODUCT{cart.length > 1 ? 'S' : ''}
      </div>
      <div className="checkout-divider" />
    </header>
  );
};

export default CheckoutHeader;