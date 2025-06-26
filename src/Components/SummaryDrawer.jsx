import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSummaryDrawer } from "../context/SummaryDrawerContext";
import { useEffect, useRef } from "react";
import "./SummaryDrawer.css";

const SummaryDrawer = () => {
  const { cart } = useCart();
  const { isSummaryDrawerOpen, closeSummaryDrawer } = useSummaryDrawer();
  const summaryDrawerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        summaryDrawerRef.current &&
        !summaryDrawerRef.current.contains(event.target)
      ) {
        closeSummaryDrawer();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeSummaryDrawer]);

  return (
    <div
      className={`summary-drawer-overlay ${isSummaryDrawerOpen ? "visible" : ""}`}
    >
      <div
        className={`summary-drawer ${isSummaryDrawerOpen ? "open" : ""}`}
        ref={summaryDrawerRef}
      >
        <div className="summary-header">
          <h4>
            YOUR ORDER ({cart.length} PRODUCT{cart.length > 1 ? "S" : ""})
          </h4>
          <button onClick={closeSummaryDrawer} className="summary-close-btn">
            ×
          </button>
        </div>

        <div className="summary-content">
          {cart.map((item) => (
            <div className="summary-item" key={`${item.id}-${item.size}`}>
              <img
                src={item.image}
                alt={item.name}
                className="summary-image"
              />
              <div className="summary-info">
                <p className="summary-name">{item.name}</p>
                {item.color && (
                  <p className="summary-detail">Color: {item.color}</p>
                )}
                {item.size && (
                  <p className="summary-detail">Size: {item.size}</p>
                )}
                <p className="summary-detail">Qty: {item.quantity}</p>
              </div>
              <p className="summary-price">€ {item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryDrawer;
