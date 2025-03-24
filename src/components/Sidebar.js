import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const sidebarStyle = {
    width: "250px",
    height: "100vh",
    backgroundColor: "#E5C4A1", // Soft Skin Brown
    color: "#5A3E2B", // Deep Brown for contrast
    padding: "20px",
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "4px 0 10px rgba(90, 62, 43, 0.2)",
  };

  const linkStyle = {
    display: "block",
    padding: "12px",
    margin: "8px 0",
    borderRadius: "8px",
    textDecoration: "none",
    color: "#5A3E2B", // Rich Brown
    fontSize: "16px",
    fontWeight: "500",
    transition: "0.3s",
    backgroundColor: "#F5E2D3", // Light Creamy Brown
    textAlign: "center",
  };

  const linkHoverStyle = {
    backgroundColor: "#D6AE82", // Softer Warm Brown
    transform: "scale(1.05)",
  };

  return (
    <div style={sidebarStyle}>
      <h2 style={{
        fontSize: "22px",
        fontWeight: "bold",
        marginBottom: "20px",
        textAlign: "center",
        background: "linear-gradient(to right, #9C6B3C, #5A3E2B)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}>
        Admin Dashboard
      </h2>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {[
          { path: "/admindashboard/manage-books", label: "Manage Books" },
          { path: "/admindashboard/books-list", label: "Books List And Analytics" },
          { path: "/admindashboard/transaction-history", label: "Transaction History" },
          { path: "/admindashboard/manage-customer-service", label: " Customer Service" },
          { path: "/admindashboard/registered-users", label: " Registered Users" },
          { path: "/admindashboard/orders-purchases", label: " Orders & Purchases" },
        ].map((item, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <Link
              to={item.path}
              style={linkStyle}
              onMouseOver={(e) => Object.assign(e.target.style, linkHoverStyle)}
              onMouseOut={(e) => Object.assign(e.target.style, linkStyle)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
