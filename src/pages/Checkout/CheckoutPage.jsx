import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import CheckoutHeader from "./CheckoutHeader";
import CheckOutSummary from "./CheckoutSummary";
import "./CheckoutPage.css";
import { useEffect } from "react";

const CheckoutPage = () => {


 
  return (
    <div className="checkout-page">

      {/* 🔹 Logo centered at top */}
      <div className="checkout-logo">
        <NavLink to="/">P E L L E</NavLink>
      </div>

      {/* 🔹 Step navigation under logo */}
      <div className="checkout-steps">
        <CheckoutHeader />
      </div>

      
      <div className="checkout-content">
        <div className="checkout-left">
          <Outlet /> {/* Renders Login, Shipping, etc. */}
        </div>

        <div className="checkout-right">
          <CheckOutSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
