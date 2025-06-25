import React from "react";
import { useCart } from "../context/CartContext";
import "./CartPage.css";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, getTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-page">
      {cart.length === 0 ? (
        <div className="empty-cart-wrapper">
          <h1 className="empty-cart-title">SHOPPING BAG</h1>
          <p className="empty-cart-subtext">
            It looks like your cart is still empty
          </p>
          <button
            className="continue-shopping-btn"
            onClick={() => navigate('/')}
          >
            CONTINUE SHOPPING
          </button>
        </div>
      ) : (
        <div className="cart-container">
          {/* Left Side: Product List */}
          <div className="cart-left">
            {/* ✅ Title goes FIRST */}
            <h1 className="cart-title">SHOPPING BAG ({cart.length})</h1>
            <p className="shipping-text">🚚 Shipping in 2–3 working days</p>
            <p className="section-label">YOUR PRODUCTS</p>

            {cart.map((item) => (
              <div key={item.id} className="product-card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="product-image"
                />
                <div className="product-info">
                  <p className="product-name">{item.name}</p>
                  {item.color && <p>Color: {item.color}</p>}
                  {item.size && <p>Size: {item.size}</p>}
                  <p>Qty: {item.quantity} </p>
                </div>
                <div className="product-price-block">
                  <p className="product-price">€ {item.price.toFixed(2)}</p>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id, item.size)}
                  >
                    REMOVE <span className="remove-icon">×</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Summary */}
          <div className="cart-right">
            <p className="summary-title">SUMMARY</p>
            <div className="summary-line">
              <span className="partial-total">Partial total</span>
              <span className="total-pay">€ {getTotal().toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span className="shipping">Shipping</span>
              <span>€ 0</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span className="total-pay">€ {getTotal().toFixed(2)}</span>
            </div>
            <p className="vat-note">(VAT € {(getTotal() * 0.21).toFixed(2)})</p>

            <div className="promo-section">
              <p className="promo-label">HAVE YOU A PROMO CODE?</p>
              <button className="promo-add">
                ADD <span className="plus">+</span>
              </button>
            </div>

            <button className="checkout-btn" onClick={() => navigate('/checkout')}>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
