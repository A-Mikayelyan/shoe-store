import React from "react";
import "./CheckOutSummary.css";
import { useCart } from "../../context/CartContext";

const CheckOutSummary = () => {
  const { cart, getTotal } = useCart();
  const total = getTotal();
  const vat = (total * 0.21).toFixed(2);

  const handleViewClick = () => {
    // You can open a drawer or modal here
    alert("Open product drawer"); // replace this with drawer logic
  };

  return (
    <div className="checkout-right">
      <div className="checkout-divider" />

      {/* ✅ Case 1: Only 1 item in cart — show with image */}
      {cart.length === 1 &&
        cart.map((item) => (
          <div key={item.id} className="checkout-product-preview">
            <img src={item.image} alt={item.name} />
            <div className="checkout-product-info">
              <p className="checkout-product-name">{item.name}</p>
              {item.color && <p>Color: {item.color}</p>}
              {item.size && <p>Size: {item.size}</p>}
              <p>Qty: {item.quantity}</p>
            </div>
            <p className="checkout-price">€ {item.price.toFixed(2)}</p>
          </div>
        ))}

      {/* ✅ Case 2: More than 1 item — show only summary and "VIEW" button */}
      {cart.length > 1 && (
        <div className="multi-cart-summary">
          <div className="multi-cart-header"></div>
        </div>
      )}

      <div className="checkout-promo">
        <p>HAVE YOU A PROMO CODE?</p>
        <button>
          ADD <span className="plus">+</span>
        </button>
      </div>

      <div className="checkout-summary-line">
        <span>Partial total</span>
        <span>€ {total.toFixed(2)}</span>
      </div>

      <div className="checkout-summary-line">
        <span>Shipping</span>
        <span>€ 0</span>
      </div>

      <div className="checkout-summary-total">
        <span>Total</span>
        <span>€ {total.toFixed(2)}</span>
      </div>

      <p className="checkout-vat-note">(VAT € {vat})</p>

      <div className="checkout-extra-info">
        <details className="info-block">
          <summary className="info-title">DO YOU NEED HELP?</summary>
          <p className="info-text">
            From Monday to Friday from 9:00 am to 1:30 pm and from 2:30 pm to
            6:00 pm (CEST).
          </p>
        </details>

        <details className="info-block">
          <summary className="info-title">SHIPPING IN 2–3 DAYS</summary>
          <p className="info-text">
            Make your purchase easily from home. Quick delivery within 2–3
            working days.
          </p>
        </details>

        <details className="info-block">
          <summary className="info-title">SECURE PAYMENT</summary>
          <p className="info-text">
            Your payment is processed safely with the highest security
            standards. We use SSL encryption to protect your personal
            information.
          </p>
        </details>
      </div>
    </div>
  );
};

export default CheckOutSummary;
