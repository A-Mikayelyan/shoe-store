import React, { useState } from "react";
import "./ShippingStep.css";
import { useNavigate } from "react-router-dom";

const ShippingStep = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    zip: "",
    city: "",
    state: "",
    country: "USA",
    courierInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/checkout/payment");
  };

  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "address1",
    "zip",
    "city",
    "state",
  ];
  const isFormValid = requiredFields.every(
    (field) => formData[field].trim() !== ""
  );

  return (
    <div className="shipping-step">
      <h1 className="addresses-title">YOUR ADDRESSES</h1>

      <form className="shipping-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>* First Name</label>
            <input
              name="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
            <span className="error-text">The name field is required</span>
          </div>
          <div className="form-group">
            <label>* Last Name</label>
            <input
              name="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
            <span className="error-text">The lastname field is required</span>
          </div>
        </div>

        <div className="form-group">
          <label>* Email</label>
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>* Phone</label>
          <input
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>* Address 1</label>
          <input
            name="address1"
            type="text"
            required
            value={formData.address1}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Address 2</label>
          <input
            name="address2"
            type="text"
            value={formData.address2}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>* ZIP Code</label>
            <input
              name="zip"
              type="text"
              required
              value={formData.zip}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>* City</label>
            <input
              name="city"
              type="text"
              required
              value={formData.city}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>* State</label>
            <input
              name="state"
              type="text"
              required
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>* Country</label>
            <input name="country" value="USA" readOnly disabled />
          </div>
        </div>

        <div className="form-group">
          <label>Courier delivery information (optional)</label>
          <input
            name="courierInfo"
            type="text"
            value={formData.courierInfo}
            onChange={handleChange}
          />
        </div>

        <button className="continue-btn" type="submit" onClick={handleSubmit} disabled = {!isFormValid}>
          PROCEED TO PAYMENT
        </button>
      </form>

      <p className="mandatory-note">Mandatory fields</p>
    </div>
  );
};

export default ShippingStep;
