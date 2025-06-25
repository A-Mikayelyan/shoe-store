import Layout from "./Components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import ShoeCategoryPage from "./pages/ShoeCategoryPage";
import ShoeDetail from "./pages/ShoeDetail";
import CheckOutLogin from "./pages/Checkout/LoginStep";
import CheckoutPage from "./pages/Checkout/CheckoutPage";

export const routes = [
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/about",
    element: (
      <Layout>
        <About />
      </Layout>
    ),
  },
  {
    path: "/shop",
    element: (
      <Layout>
        <Shop />
      </Layout>
    ),
  },
  {
    path: "/contact",
    element: (
      <Layout>
        <Contact />
      </Layout>
    ),
  },
  {
    path: "/cart",
    element: (
      <Layout>
        <Cart />
      </Layout>
    ),
  },
  {
    path: "/favorites",
    element: (
      <Layout>
        <Favorites />
      </Layout>
    ),
  },
  {
    path: "/men/:category",
    element: (
      <Layout>
        <ShoeCategoryPage />
      </Layout>
    ),
  },

  {
  path: "/cart",
  element: <Layout>
    <CartPage />
  </Layout>
},

  {
    path: "/shoe/:id",
    element: (
      <Layout>
        <ShoeDetail />
      </Layout>
    ),
  },

  {
    path: "/checkout",
    element: (
      <Layout>
        <CheckoutPage />
      </Layout>
    ),
  },



];
