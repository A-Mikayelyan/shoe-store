import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ShoeDetail from "./ShoeDetail";
import ShoeCategoryPage from "./pages/ShoeCategoryPage";
import WomenCategoryPage from "./pages/WomenCategoryPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import LoginStep from "./pages/Checkout/steps/LoginStep";
import ShippingStep from "./pages/Checkout/steps/ShippingStep";
import PaymentStep from "./pages/Checkout/steps/PaymentStep";
import ReviewStep from "./pages/Checkout/steps/ReviewStep";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<CartPage />} />

        {/* ✅ Gender-specific shoe detail routes */}
        <Route path="men/shoe/:id" element={<ShoeDetail gender="men" />} />
        <Route path="women/shoe/:id" element={<ShoeDetail gender="women" />} />

        {/* ✅ Category pages */}
        <Route path="men/:category" element={<ShoeCategoryPage />} />
        <Route path="women/:category" element={<WomenCategoryPage />} />

        {/* ✅ Checkout steps */}
        <Route path="checkout" element={<CheckoutPage />}>
          <Route index element={<LoginStep />} />
          <Route path="shipping" element={<ShippingStep />} />
          <Route path="payment" element={<PaymentStep />} />
          <Route path="review" element={<ReviewStep />} />
        </Route>

        {/* ✅ Fallback redirect for outdated or broken shoe route */}
        <Route path="shoe/:id" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
