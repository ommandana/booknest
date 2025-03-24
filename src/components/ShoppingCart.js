import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../assets/css/ShoppingCart.css";

const ShoppingCart = () => {
  const { cart, totalPrice, removeFromCart, decreaseQuantity, addToCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Check if the user is logged in
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) === true;

  const handleCheckout = () => {
    if (isLoggedIn) {
      // ✅ Save cart before navigating
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
      navigate("/Payment");
    } else {
      navigate("/Payment");
    }
  };

  return (
    <div className="container mt-5 page-content">
      <h2 className="text-center mb-4">🛒 Your Shopping Cart</h2>

      {/* Show cart items */}
      {cart.length > 0 ? (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div>
                <h5>{item.title}</h5>
                <p>Author: {item.author}</p>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>

                {/* Quantity Control */}
                <div className="quantity-controls">
                  <button className="btn btn-sm btn-secondary" onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button className="btn btn-sm btn-secondary" onClick={() => addToCart(item)}>+</button>
                </div>

                {/* Remove Button */}
                <button className="btn btn-danger btn-sm mt-2" onClick={() => removeFromCart(item.id)}>
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total Price */}
          <h4 className="text-end mt-3">Total: ₹{totalPrice.toFixed(2)}</h4>

          {/* Clear Cart Button */}
          <div className="text-center mt-3">
            <button className="btn btn-warning" onClick={clearCart}>🗑 Clear Cart</button>
          </div>
        </div>
      ) : (
        <p className="text-center">Your cart is empty.</p>
      )}

      {/* Checkout Button */}
      {cart.length > 0 && (
        <div className="text-center mt-4">
          <button className="btn btn-primary btn-lg" onClick={handleCheckout}>
            Proceed to Payment 💳
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
