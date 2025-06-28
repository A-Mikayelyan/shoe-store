import React, { createContext, useContext, useState } from "react";


const CheckoutContext = createContext();


export const CheckoutProvider = ({ children }) => {
  
 const [shippingInfo, setShippingInfo] = useState({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  zip: "",
  city: "",
  state: "",
  country: "",
  courierInfo: ""
});

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    securityCode: "",
    nameOnCard: ""
  });

  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // 4️⃣ Function to reset all (optional but useful)
  const resetCheckout = () => {
    setShippingInfo({
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      phone: ""
    });
    setPaymentInfo({
      cardNumber: "",
      expiryDate: "",
      securityCode: "",
      nameOnCard: ""
    });
    setDeliveryMethod("");
    setAgreedToTerms(false);
  };

  // 5️⃣ Provide values to all children
  return (
    <CheckoutContext.Provider
      value={{
        shippingInfo,
        setShippingInfo,
        paymentInfo,
        setPaymentInfo,
        deliveryMethod,
        setDeliveryMethod,
        agreedToTerms,
        setAgreedToTerms,
        resetCheckout
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

// 6️⃣ Custom hook for easier access
export const useCheckout = () => useContext(CheckoutContext);
