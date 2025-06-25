import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginStep.css';

const LoginStep = () => {
  const [inputEmail, setInputEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can store email or validate here if needed
    navigate('/checkout/shipping'); // ✅ navigation happens here
  };

  return (
    <div className="login-part">
      <p className="email-msg">Please enter your email to proceed</p>
      <form onSubmit={handleSubmit}>
        <label className="email-label">
          * Email
          <input
            type="email"
            className="email-input"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            required
          />
        </label>

        <div className="input-underline"></div>

        <button type="submit" className="continue-btn">
          CONTINUE
        </button>
      </form>

      <p className="mandatory-note">* Mandatory fields</p>
    </div>
  );
};

export default LoginStep;
