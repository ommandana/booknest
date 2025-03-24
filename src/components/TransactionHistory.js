import React, { useState, useEffect } from "react";
import "../style/TransactionHistory.css";

const TransactionHistory = () => {
  // Load transactions from local storage
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);
  }, []);

  // Filter transactions based on search input
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.bookTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="transaction-container">
      <h2>Transaction History</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by book title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      {/* Transaction Table */}
      <table className="transaction-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Book Title</th>
            <th>User</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.id}</td>
                <td>{transaction.bookTitle}</td>
                <td>{transaction.user}</td>
                <td>₹{transaction.amount}</td>
                <td>{transaction.date}</td>
                <td className={transaction.status.toLowerCase()}>{transaction.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No transactions found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
