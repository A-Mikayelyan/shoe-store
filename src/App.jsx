import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ShoeDetail from "./ShoeDetail";
import ShoeCategoryPage from "./pages/ShoeCategoryPage";
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
        <Route path="shoe/:id" element={<ShoeDetail />} />
        <Route path="men/:category" element={<ShoeCategoryPage />} />

        {/* ✅ Nested under /checkout */}
        <Route path="checkout" element={<CheckoutPage />}>
          <Route index element={<LoginStep />} />
          <Route path="shipping" element={<ShippingStep />} />
          <Route path="payment" element ={ <PaymentStep/>} />
          <Route path="review" element ={ <ReviewStep/>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App