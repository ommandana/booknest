import { useState, useEffect } from "react";
import React from "react";
import {Routes, Route } from "react-router-dom";

import ManageBooks from "./ManageBooks";
import BooksList from "./BooksList";
import TransactionHistory from "./TransactionHistory";
import ManageCustomerService from "./ManageCustomerService";
import RegisteredUsers from "./RegisteredUsers";
import OrdersPurchases from "./OrdersPurchases";
import ScrollToTop from "./ScrollToTop";

import Sidebar from "./Sidebar";




const AdminDashboard = () => {
  // Load books from local storage if available
  const [books, setBooks] = useState(() => {
    const storedBooks = localStorage.getItem("books");
    return storedBooks ? JSON.parse(storedBooks) : [];
  });

  // Update local storage whenever books change
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  // CSS Styles
  const dashboardContainer = {
    display: "flex",
    height: "100vh",
    backgroundColor: "#f4f4f9", // Light gray for modern UI
  };

  const sidebarStyle = {
    width: "20%",
    minWidth: "250px",
    backgroundColor: "#1e1e2f",
    boxShadow: "2px 0 10px rgba(0, 0, 0, 0.2)",
    height: "100vh",
  };

  const mainContentStyle = {
    flexGrow: 1,
    padding: "20px",
    overflowY: "auto",
    backgroundColor: "#ffffff", // White for contrast
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    margin: "15px",
  };

  return (
    
      <div style={dashboardContainer}>
        {/* Sidebar */}
        <div style={sidebarStyle}>
          <Sidebar />
        </div>
        

        {/* Main Content */}
        <div style={mainContentStyle}>
        <ScrollToTop />
          <Routes>
            {/* Manage Books (CRUD operations) */}
            <Route path="manage-books" element={<ManageBooks books={books} setBooks={setBooks} />} />
            
            {/* Books List (Only display books) */}
            <Route path="books-list" element={<BooksList books={books} />} />

            {/* Other Pages */}
            <Route path="transaction-history" element={<TransactionHistory />} />
            <Route path="manage-customer-service" element={<ManageCustomerService />} />
            <Route path="registered-users" element={<RegisteredUsers />} />
            <Route path="orders-purchases" element={<OrdersPurchases />} />
          </Routes>
        </div>
      </div>
    
  );
};

export default AdminDashboard;
