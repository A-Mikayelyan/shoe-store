import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ReviewStep.css";
import { useCheckout } from "../../../context/CheckoutContext";
import { useCart } from "../../../context/CartContext";

const ReviewStep = () => {
  const { shippingInfo } = useCheckout();
  const { getTotal } = useCart();
  const total = getTotal().toFixed(2);
  const navigate = useNavigate();

  const [confirmed, setConfirmed] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (
      !shippingInfo ||
      !shippingInfo.firstName ||
      !shippingInfo.lastName ||
      !shippingInfo.address1 ||
      !shippingInfo.city ||
      !shippingInfo.country ||
      !shippingInfo.email
    ) {
      navigate("/checkout/shipping");
    }
  }, [shippingInfo, navigate]);

  const handleConfirm = () => {
  if (confirmed) {
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
      navigate('/');
    }, 1500); // navigate after toast disappears
  }
};

  return (
    <div className="review-page">
      {toastVisible && (
        <div className="toast-inline">
          <span>Order submitted, thank you for your purchase</span>
          <button onClick={() => setToastVisible(false)}>&times;</button>
        </div>
      )}

      <div className="review-left">
        <h2 className="review-title">REVIEW AND CONFIRM YOUR ORDER DATA</h2>
        <div className="divider-line" />

        <div className="review-grid">
          <div>
            <h4>Shipping method</h4>
            <p>Shipping: € 0</p>
          </div>

          <div>
            <h4>Shipping address</h4>
            <p>
              {shippingInfo.firstName} {shippingInfo.lastName}
            </p>
            <p>{shippingInfo.address1 || "Not provided"}</p>
            {shippingInfo.address2 && <p>{shippingInfo.address2}</p>}
            <p>
              {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
            </p>
            <p>{shippingInfo.country}</p>
            <p>{shippingInfo.phone}</p>
            <p>{shippingInfo.email}</p>
          </div>

          <div>
            <h4>Payment</h4>
            <p>CREDIT_CARD</p>
            <p>Total: € {total}</p>
          </div>

          <div>
            <h4>Billing address</h4>
            <p>
              {shippingInfo.firstName} {shippingInfo.lastName}
            </p>
            <p>{shippingInfo.address1 || "Not provided"}</p>
            {shippingInfo.address2 && <p>{shippingInfo.address2}</p>}
            <p>
              {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
            </p>
            <p>{shippingInfo.country}</p>
            <p>{shippingInfo.phone}</p>
            <p>{shippingInfo.email}</p>
          </div>
        </div>

        <div className="review-confirm-line" />

        <div className="review-confirm">
          <input
            type="checkbox"
            id="confirm"
            checked={confirmed}
            onChange={() => setConfirmed(!confirmed)}
          />
          <label htmlFor="confirm">
            *By confirming the order, I declare that the details are correct and
            ready to be processed.
          </label>
        </div>

        <button
          className="send-order-btn"
          onClick={handleConfirm}
          disabled={!confirmed}
        >
          SEND ORDER
        </button>
      </div>
    </div>
  );
};

export default ReviewStep;
