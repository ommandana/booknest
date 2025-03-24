import React, { useState, useEffect } from "react";
import "../style/ManageCustomerService.css";
const ManageCustomerService = () => {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem("customerTickets")) || [];
    setTickets(storedTickets);
  }, []);
  const newUser = {
    id: Date.now(),
    name: "John Doe",
    email: "john@example.com",
    role: "User",
  };
  
  const existingUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  existingUsers.push(newUser);
  localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));
  
  // Function to update ticket status
  const updateStatus = (id, newStatus) => {
    const updatedTickets = tickets.map(ticket =>
      ticket.id === id ? { ...ticket, status: newStatus } : ticket
    );
    setTickets(updatedTickets);
    localStorage.setItem("customerTickets", JSON.stringify(updatedTickets));
  };

  // Filter tickets
  const filteredTickets = tickets.filter(ticket => filter === "all" || ticket.status === filter);

  return (
    <div className="customer-service-container">
      <h2>Customer Service - Support Tickets</h2>

      {/* Filter Dropdown */}
      <select onChange={(e) => setFilter(e.target.value)} className="filter-dropdown">
        <option value="all">All</option>
        <option value="Pending">Pending</option>
        <option value="Resolved">Resolved</option>
        <option value="Closed">Closed</option>
      </select>

      {/* Ticket List */}
      <table className="ticket-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Issue</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.length > 0 ? (
            filteredTickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.name}</td>
                <td>{ticket.email}</td>
                <td>{ticket.issue}</td>
                <td className={ticket.status.toLowerCase()}>{ticket.status}</td>
                <td>
                  {ticket.status !== "Resolved" && (
                    <button onClick={() => updateStatus(ticket.id, "Resolved")} className="resolve-btn">Resolve</button>
                  )}
                  {ticket.status !== "Closed" && (
                    <button onClick={() => updateStatus(ticket.id, "Closed")} className="close-btn">Close</button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No customer tickets found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCustomerService;
