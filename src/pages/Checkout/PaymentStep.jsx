import React, { useState } from "react";
import "./PaymentStep.css";

const PaymentStep = () => {
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    securityCode: "",
    nameOnCard: "",
  });

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 16);
    value = value.replace(/(.{4})/g, "$1 ").trim();
    setCardData((prev) => ({ ...prev, cardNumber: value }));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 4);
    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    setCardData((prev) => ({ ...prev, expiryDate: value }));
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 3);
    setCardData((prev) => ({ ...prev, securityCode: value }));
  };

  const handleNameChange = (e) => {
    const onlyLettersAndSpaces = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setCardData((prev) => ({ ...prev, nameOnCard: onlyLettersAndSpaces }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidCardNumber || !isValidCvv || !isValidExpiry || !agreed) return;
  };

  const isValidCardNumber =
    cardData.cardNumber.replace(/\s/g, "").length === 16;
  const isValidCvv = cardData.securityCode.length === 3;

  const validateExpiry = (value) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(value)) return false;

    const [month, year] = value.split("/");
    const expiryDate = new Date(`20${year}`, parseInt(month));
    const today = new Date();

    return expiryDate > today;
  };

  const isExpiryTyped = cardData.expiryDate.length > 0;
  const isValidExpiry = validateExpiry(cardData.expiryDate);
  const showExpiryError = isExpiryTyped && !isValidExpiry;

  return (
    <div className="payment-container">
      <h2 className="payment-title">PAYMENT METHOD</h2>
      <hr className="section-divider" />
      <p className="required-note">
        All fields are required unless marked otherwise*.
      </p>

      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="card-input">
          <label>Card number</label>
          <div className="input-with-icon">
            <input
              type="text"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardData.cardNumber}
              onChange={handleCardNumberChange}
              required
            />
            {isValidCardNumber && (
              <span className="checkmark-cardnumber">✔</span>
            )}
          </div>
        </div>

        <div className="row">
          <div className="card-input">
            <label>Expiry date</label>
            <div className="input-with-icon">
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={cardData.expiryDate}
                onChange={handleExpiryChange}
                required
                className={isValidExpiry === false ? "invalid" : ""}
              />
              {isValidExpiry && <span className="checkmark-date">✔</span>}
              {isValidExpiry === false && <span className="crossmark">✖</span>}
            </div>
            {isValidExpiry === false && (
              <p className="error-text">Enter a valid expiry date</p>
            )}
          </div>

          <div className="card-input">
            <label>Security code</label>
            <div className="input-with-icon">
              <input
                type="password"
                name="securityCode"
                placeholder="3 digits"
                value={cardData.securityCode}
                onChange={handleCvvChange}
                required
              />
              {isValidCvv && <span className="checkmark-cvv">✔</span>}
            </div>
          </div>
        </div>

        <div className="card-input">
          <label>Name on card</label>
          <input
            type="text"
            name="nameOnCard"
            placeholder="J. Smith"
            value={cardData.nameOnCard}
            onChange={handleNameChange}
            required
          />
        </div>

        <button
          type="submit"
          className="continue-btn"
          disabled={
            !isValidCardNumber ||
            !isValidCvv ||
            !isValidExpiry ||
            cardData.nameOnCard.trim() === ""
          }
        >
          REVIEW AND CONFIRM YOUR ORDER
        </button>
      </form>
    </div>
  );
};

export default PaymentStep;
