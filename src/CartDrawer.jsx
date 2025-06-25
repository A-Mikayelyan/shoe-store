import { useCart } from "./context/CartContext";
import { useCartDrawer } from "./context/CartDrawerContext";
import { useEffect, useRef } from "react";
import "./CartDrawer.css";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const { cart, removeFromCart } = useCart();
  const { isCartDrawerOpen, closeCartDrawer } = useCartDrawer();
  const cartDrawerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleDrawerClickOutside = (event) => {
      if (cartDrawerRef.current && !cartDrawerRef.current.contains(event.target)) {
        closeCartDrawer();
      }
    };

    if (isCartDrawerOpen) {
      document.addEventListener("mousedown", handleDrawerClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleDrawerClickOutside);
    };
  }, [isCartDrawerOpen, closeCartDrawer]);

  return (
    <div className={`cart-drawer ${isCartDrawerOpen ? "open" : ""}`} ref={cartDrawerRef}>
      <div className="cart-drawer-header">
        <h3 className="bag-header">ADDED TO YOUR BAG</h3>
        <button className="close-btn" onClick={closeCartDrawer}>
          ×
        </button>
      </div>

      <div className="cart-drawer-content">
        {cart.length === 0 ? (
          <p className="empty-text">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div className="drawer-item" key={`${item.id}-${item.size}`}>
              <img src={item.image} alt={item.name} className="drawer-image" />
              <div className="drawer-info">
                <p className="drawer-name">{item.name}</p>
                {item.size && <p className="drawer-size">Size: {item.size}</p>}
                <p className="drawer-qty">Qty: {item.quantity}</p>
                <p className="drawer-price">€ {item.price.toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="remove-btn"
                >
                  REMOVE ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-drawer-footer">
          <button className="checkout-btn" onClick={() => {
            navigate('/checkout'),
            closeCartDrawer();
          }}>PROCEED TO CHECKOUT</button>
          <button
            className="cart-btn"
            onClick={() => {
              closeCartDrawer();
              navigate("/cart");
            }}
          >
            GO TO CART
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
