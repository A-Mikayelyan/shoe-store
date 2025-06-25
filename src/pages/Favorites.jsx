import React from "react";
import { SHOE_API } from "../constants/api";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import "./Favorites.css";
import { useCartDrawer } from "../context/CartDrawerContext";


const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();
  const { addToCart } = useCart();
  const {openCartDrawer, closeCartDrawer} = useCartDrawer();

  const favoriteShoes = SHOE_API.filter((shoe) =>
    favorites.includes(shoe.id)
  );

  return (
    <div className="wishlist-container">
  <h2 className="wishlist-title">WISHLIST</h2>

  {favoriteShoes.length === 0 ? (
    <p className="empty-wishlist-text">You haven’t added any favorites yet.</p>
  ) : (
    favoriteShoes.map((shoe) => (
      <div className="wishlist-item" key={shoe.id}>
        <div className="wishlist-left">
          <img src={shoe.image} alt={shoe.name} />
        </div>
        <div className="wishlist-center">
          <p className="wishlist-name">{shoe.name}</p>
          <p className="wishlist-color">Color: {shoe.color || "N/A"}</p>
          <button
            className="wishlist-cart-btn"
            onClick={() => {
              addToCart({ ...shoe, quantity: 1 }),
              openCartDrawer(true);
            }}
          >
            ADD TO CART
          </button>
        </div>
        <div className="wishlist-right">
          <button
            className="wishlist-remove"
            onClick={() => removeFavorite(shoe.id)}
          >
            REMOVE <span className="x">×</span>
          </button>
          <p className="wishlist-price">€ {shoe.price}</p>
        </div>
      </div>
    ))
  )}
</div>

  );
};

export default Favorites;
