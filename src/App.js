import React from "react";
import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Form from "./components/Register";
import ShoppingCart from "./components/ShoppingCart";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import '@fortawesome/fontawesome-free/css/all.min.css';
import ScrollToTop from "./components/ScrollToTop";

import PaymentPage from "./components/PaymentPage";
import AdminDashboard from "./components/AdminDashboard";
import Profile from "./components/Profile";



const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <MainContent />
      </BrowserRouter>
    </CartProvider>
  );
};

const MainContent = () => {
  const location = useLocation(); // Get the current path

  // Check if the current path starts with "/admindashboard"
  const isAdminPage = location.pathname.startsWith("/admindashboard");

  return (
    <div>
      {/* Render Header/Footer only if NOT on Admin Dashboard */}
      {!isAdminPage && <Header />}
      <ScrollToTop />
      <Routes>
    
        
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Payment" element={<PaymentPage />} />
       
        <Route path="/home" element={<HomePage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/books" element={<ProductList />} />
        <Route path="/admindashboard/*" element={<AdminDashboard />} />
        <Route path="/reg" element={<Form />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/register" element={<Register />} />
        
      </Routes>

      {!isAdminPage && <Footer />} {/* Hide Footer for Admin */}
    </div>
  );
};

export default App;
