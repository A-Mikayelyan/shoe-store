import { useParams } from "react-router-dom";
import { SHOE_API } from "./constants/api";
import "./ShoeDetails.css";
import { useCart } from "./context/CartContext";
import { useState } from "react";
import { useCartDrawer } from "./context/CartDrawerContext";
import { useFavorites } from "./context/FavoritesContext";

const ShoeDetail = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const { openCartDrawer } = useCartDrawer();
  const { favorites, toggleFavorites } = useFavorites();

  const [selectedSize, setSelectedSize] = useState("");
  const [showFavMessage, setShowFavMessage] = useState(false);
  const [showSizeDrawer, setShowSizeDrawer] = useState(false);

  

  const shoe = SHOE_API.find((item) => item.id === parseInt(id));
  if (!shoe) return <div className="not-found">Shoe not found</div>;

  return (
    <div className="shoe-detail-page">
      {/* Favorite toast */}
      {showFavMessage && (
        <div className="toast-fav">
          {favorites.includes(shoe.id)
            ? "Added to favorites"
            : "Removed from favorites"}
          <button
            onClick={() => setShowFavMessage(false)}
            className="close-toast"
          >
            ×
          </button>
        </div>
      )}

      {/* Size Drawer */}
      {showSizeDrawer && (
        <>
          <div
            className="size-overlay"
            onClick={() => setShowSizeDrawer(false)}
          />
          <div
            className="size-drawer slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-size-drawer"
              onClick={() => setShowSizeDrawer(false)}
            >
              ×
            </button>
            <h3 className="size-drawer-title">SELECT YOUR SIZE</h3>
            <div className="drawer-size-options">
              {["36", "37", "38", "39", "40", "41", "42", "43", "44"].map(
                (size) => (
                  <div
                    key={size}
                    className={`drawer-size-item ${
                      selectedSize === size ? "active" : ""
                    }`}
                    onClick={() => {
                      setSelectedSize(size);
                      setShowSizeDrawer(false);
                    }}
                  >
                    {size}
                  </div>
                )
              )}
            </div>
          </div>
        </>
      )}

      {/* Product layout */}
      <div className="shoe-image-section">
        <img src={shoe.image} alt={shoe.name} className="shoe-detail-image" />
      </div>

      <div className="shoe-info-section">
        <h2 className="shoe-title">{shoe.name}</h2>
        <p className="shoe-price">€ {shoe.price.toFixed(2)}</p>

        {/* Styled select box with guide */}
        <div className="size-select-container" onClick={() => setShowSizeDrawer(true)}>
          <div className="size-select-box">
            <span className="size-label">{selectedSize || "Size"}</span>
            <span className="size-arrow">⌄</span>
          </div>
          <a href="#" className="size-guide">
            Size guide
          </a>
        </div>

        <div className="add-to-cart-wrapper">
          <button
            className="add-to-cart-btn"
            onClick={() => {
              if (!selectedSize) {
                setShowSizeDrawer(true);
                return;
              }
              addToCart({ ...shoe, size: selectedSize });
              openCartDrawer();
            }}
          >
            ADD TO CART
          </button>
          <button
            className={`wishlist-icon ${
              favorites.includes(shoe.id) ? "active" : ""
            }`}
            onClick={() => {
              toggleFavorites(shoe.id);
              setShowFavMessage(true);
              setTimeout(() => setShowFavMessage(false), 3000);
            }}
          >
            {favorites.includes(shoe.id) ? "♥" : "♡"}
          </button>
        </div>

        <p className="shoe-description">
          pelle’s creative attitude takes centre stage with this refined,
          elegant loafer. Classic brogue perforations and our traditional
          “velatura” colour-grading technique are fused with a sophisticated
          design defined by a decorative fringe detail.
        </p>
      </div>
    </div>
  );
};

export default ShoeDetail;
