import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../assets/css/PaymentPage.css";

const PaymentPage = () => {
  const { clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // ✅ Card Payment State
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [errors, setErrors] = useState({}); // ✅ Store validation errors

  // ✅ Load cart data from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedTotalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;

    console.log("🛒 Cart Data Loaded from localStorage:", storedCart);
    console.log("💰 Total Price Loaded from localStorage:", storedTotalPrice);
    
    setCart(storedCart);
    setTotalPrice(storedTotalPrice);
  }, []);

  // ✅ Handle Input Change
  const handleInputChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  // ✅ Validate Card Details
  const validateCardDetails = () => {
    let newErrors = {};

    // Card Number (16 digits)
    if (!/^\d{16}$/.test(cardDetails.cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }

    // Expiry Date (MM/YY format)
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiryDate)) {
      newErrors.expiryDate = "Expiry date must be in MM/YY format.";
    }

    // CVV (3 digits)
    if (!/^\d{3}$/.test(cardDetails.cvv)) {
      newErrors.cvv = "CVV must be 3 digits.";
    }

    // Cardholder Name (at least 3 characters)
    if (cardDetails.cardholderName.length < 3) {
      newErrors.cardholderName = "Name must be at least 3 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ✅ Returns true if no errors
  };

  // ✅ Handle Payment
  const handlePayment = () => {
    if (paymentMethod === "card" && !validateCardDetails()) {
      return; // ❌ Stop payment if validation fails
    }

    alert(`Payment Successful! Method: ${paymentMethod} | Amount: ₹${totalPrice.toFixed(2)}`);

    // ✅ Store card details (excluding CVV for security)
    if (paymentMethod === "card") {
      const { cardNumber, expiryDate, cardholderName } = cardDetails;
      localStorage.setItem("cardDetails", JSON.stringify({ cardNumber, expiryDate, cardholderName }));
    }

    // ✅ Clear cart and reset localStorage
    clearCart();
    localStorage.removeItem("cart");
    localStorage.removeItem("totalPrice");

    // ✅ Redirect to Home after payment
    navigate("/");
  };

  return (
    <div className="container mt-5 payment-page">
      <h2 className="text-center mb-4">💳 Choose Payment Method</h2>

      {/* ✅ Order Summary */}
      <div className="order-summary page-content">
        <h4>📦 Order Summary</h4>
        {cart.length > 0 ? (
          cart.map((item) => (
            <p key={item.id}>📖 {item.title} - {item.quantity}x ₹{item.price}</p>
          ))
        ) : (
          <p>No items in cart</p>
        )}
        <h4>Total: ₹{totalPrice.toFixed(2)}</h4>
      </div>

      {/* ✅ Payment Options */}
      <div className="payment-options">
        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />
          <span>💳 Card Pay</span>
        </label>

        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />
          <span>🚚 Cash on Delivery</span>
        </label>
      </div>

      {/* ✅ Card Payment Inputs (Only Show if Card Payment is Selected) */}
      {paymentMethod === "card" && (
       <div className="card-payment">
       <h4>💳 <b>Enter Card Details</b></h4>
     
       {/* 🔢 Card Number (Full Width) */}
       <div className="input-group card-number">
         <label>Card Number</label>
         <input type="text" placeholder="1234 5678 9012 3456" maxLength="19" />
       </div>
     
       {/* 📆 Expiry & CVV (Two-Column Layout) */}
       <div className="row">
         <div className="input-group">
           <label>Expiry Date (MM/YY)</label>
           <input type="text" placeholder="MM/YY" maxLength="5" />
         </div>
         <div className="input-group">
           <label>CVV</label>
           <input type="password" placeholder="***" maxLength="3" />
         </div>
       </div>
     
       {/* 👤 Cardholder Name (Full Width) */}
       <div className="input-group">
         <label>Cardholder Name</label>
         <input type="text" placeholder="Om mandana" />
       </div>
     </div>
     
      )}

      {/* ✅ Payment Button */}
      <div className="text-center mt-3">
        <button className="btn btn-success btn-lg" onClick={handlePayment} disabled={cart.length === 0}>
          Pay Now (₹{totalPrice.toFixed(2)})
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
