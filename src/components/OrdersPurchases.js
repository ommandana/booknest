import React, { useState, useEffect } from "react";
import "../style/OrdersPurchases.css";

const OrdersPurchases = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === "all" || order.status === statusFilter)
  );

  return (
    <div className="orders-container">
      <h2>Orders & Purchases</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by Customer Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Status Filter Dropdown */}
      <select onChange={(e) => setStatusFilter(e.target.value)} className="filter-dropdown">
        <option value="all">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      {/* Orders List */}
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Items</th>
            <th>Total Price</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.items.join(", ")}</td>
                <td>₹{order.totalPrice}</td>
                <td>{order.date}</td>
                <td className={`status-${order.status.toLowerCase()}`}>{order.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPurchases;
