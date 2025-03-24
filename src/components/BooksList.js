import React from "react";
import "../style/BooksList.css";
import { Line, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement, 
    Title,
    Tooltip,
    Legend
  } from "chart.js";
  
 
  
  // Register the required scales
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement, 
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
// Dummy Data for Analytics
const salesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  datasets: [
    {
      label: "Product Sales",
      data: [50, 100, 80, 130, 180, 200, 230, 190, 250],
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 2,
    },
  ],
};

const orderTrendsData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  datasets: [
    {
      label: "New Orders",
      data: [100, 90, 120, 150, 200, 250, 220, 300, 350],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 2,
    },
  ],
};

const BooksList = ({ books }) => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Books List</h2>
      <div className="row">
        {books.length > 0 ? (
          books.map((book, index) => (
            <div key={index} className="col-md-4">
              <div className="card mb-4 shadow-sm">
                {/* Book Cover Image */}
                <img
                  src={book.image}
                  alt={book.title}
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">
                    <strong>Author:</strong> {book.author}
                    <br />
                    <strong>Price:</strong> ₹{book.price}
                    <br />
                    <strong>Stock:</strong> {book.stock}
                    <br />
                    <strong>Desc:</strong> {book.description}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h5 className="text-center">No books available.</h5>
        )}
      </div>

      {/* 📊 Analytics Section */}
      <div className="analytics-section mt-5">
        <h2 className="text-center">Analytics Overview</h2>

        {/* Top Cards */}
        <div className="dashboard-cards">
          <div className="card total-products">
            <h3>Total Products</h3>
            <p>{books.length}</p>
          </div>
          <div className="card new-users">
            <h3>New Users</h3>
            <p>↑ 1,238</p>
          </div>
          <div className="card new-orders">
            <h3>New Orders</h3>
            <p>↓ 4,658</p>
          </div>
          <div className="card total-profit">
            <h3>Total Profit</h3>
            <p>↑ $5.6M</p>
          </div>
        </div>

        {/* Graphs & Charts */}
        <div className="charts">
          <div className="chart-container">
            
            <h3>Product Sales (Monthly)</h3>

            <Line data={salesData} />
          </div>
          <div className="chart-container">
            <h3>Order Trends</h3>
            <Bar data={orderTrendsData} />

          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <div className="recent-buyers">
            <h3>Recent Buyers</h3>
            <ul>
              <li>🟢 Kristopher Candy - $1,021</li>
              <li>🔵 Lawrence Fowler - $2,021</li>
              <li>🟠 Linda Olson - $1,112</li>
            </ul>
          </div>
          <div className="recent-orders">
            <h3>Recent Orders</h3>
            <ul>
              <li>Order #2345 - <b>Completed</b></li>
              <li>Order #2346 - <b>Pending</b></li>
              <li>Order #2347 - <b>Shipped</b></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksList;
