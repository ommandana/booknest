import React, { createContext, useContext, useState, useEffect } from "react";

// ✅ Create Context
const CartContext = createContext();

// ✅ Provider Function
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // ✅ Load Cart from localStorage on app start
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedTotalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;
    
    setCart(storedCart);
    setTotalPrice(storedTotalPrice);
  }, []);

  // ✅ Save Cart to localStorage on updates
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("totalPrice", totalPrice.toFixed(2));
  }, [cart, totalPrice]);

  // ✅ Add to Cart Function
  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }

    setTotalPrice((prevTotal) => prevTotal + item.price);
  };

  // ✅ Remove Item from Cart
  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    const newTotal = updatedCart.reduce((total, item) => total + item.price * item.quantity, 0);

    setCart(updatedCart);
    setTotalPrice(newTotal);
  };

  // ✅ Clear Cart Function
  const clearCart = () => {
    setCart([]);
    setTotalPrice(0);
    localStorage.removeItem("cart");
    localStorage.removeItem("totalPrice");
  };

  return (
    <CartContext.Provider value={{ cart, totalPrice, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom Hook to use Cart Context
export const useCart = () => {
  return useContext(CartContext);
};
