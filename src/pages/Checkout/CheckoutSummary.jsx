import React from "react";

import "./CheckOutSummary.css";
import { useCart } from "../../context/CartContext";

const CheckOutSummary = () => {
  const { cart, getTotal } = useCart();

  const total = getTotal();
  const vat = (total * 0.21).toFixed(2);

  return (
    <div className="checkout-right">
      {/* <p className="product-count">{cart.length} PRODUCT{cart.length > 1 ? "S" : ""}</p> */}

      {cart.map((item) => (
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

      <div className="checkout-promo">
        <p>HAVE YOU A PROMO CODE?</p>
        <button>ADD <span className="plus">+</span></button>
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
    </div>
  );
};

export default CheckOutSummary;
