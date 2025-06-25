import { useState, useEffect, useContext, createContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

 const addToCart = (product) => {
  setCart((prev) => {
    const exists = prev.find(
      (item) => item.id === product.id && item.size === product.size
    );

    return exists
      ? prev.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...prev, { ...product, quantity: 1 }];
  });
};


 const removeFromCart = (id, size) => {
  setCart((prev) =>
    prev.filter((item) => !(item.id === id && item.size === size))
  );
};

  const clearCart = () => {
    setCart([]);
  };

  const updateQty = (id, quantity) => {
    setCart((prev) => prev.map ((item) => item.id === id ? {...item, quantity} : item))
  };

  const getTotal = () => {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

  return (
    <CartContext.Provider
      value={{ cart, addToCart, clearCart, removeFromCart, updateQty, getTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
