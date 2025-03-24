import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/HomePage.css";
import bookImage from "../assets/image/download.jpeg"; // Hero image

import bookshelvesImage from "../assets/image/BookShelves.jpeg"; // Cozy reading space
import Book8 from "../assets/image/book8.jpeg";
import Book6 from "../assets/image/book6.jpeg";
import Book1 from "../assets/image/book1.png";


// Best Sellers (Manually defined books)
const bestSellers = [
  { id: 12, title: "Space Odyssey 3000", author: "Luke Anderson", price: 70.0, image: Book8 },
  { id: 1, title: "Simple way of peace life", author: "Armor Ramsey", price: 40.0, image: Book1 },

];

// New Arrivals (Manually defined books)
const newArrivals = [
  { id: 10, title: "Galactic Wars", author: "Alex Ray", price: 60.0, image: Book6 },
  { id: 12, title: "Space Odyssey 3000", author: "Luke Anderson", price: 70.0, image: Book8 },
];

const HomePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // Form validation
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      console.log("Contact Form Data:", formData);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="page-content">
      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1>Your Gateway to a World of Stories</h1>
              <p className="subtitle">Explore, Discover, and Enjoy a Vast Collection of Books</p>
              <div className="d-flex  row align-items-center">
                <Link to="/books" className="btn-get-started">Explore Books</Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <img src={bookImage} alt="Book" className="hero-img" />
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="best-sellers">
        <h2>Best Sellers</h2>
        <div className="book-list">
          {bestSellers.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} className="book-image" />
              <h5 className="book-title">{book.title}</h5>
              <p className="book-author">{book.author}</p>
            </div>
            
          ))}
          
         
        </div>
        <br></br>
        <div className="d-flex  row align-items-center">
                <Link to="/books" className="btn-get-started" align="centre">Lets Dive into the Books</Link>
              </div>
        
      </section>

      {/* New Arrivals Section */}
      <section className="new-arrivals">
        <h2>New Arrivals</h2>
        <div className="book-list">
          {newArrivals.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} className="book-image" />
              <h5 className="book-title">{book.title}</h5>
              <p className="book-author">{book.author}</p>
            </div>
          ))}
         
        </div>
       
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About BookNest</h2>
        <p>
          BookNest is a haven for book lovers. We provide a curated collection
          of books from various genres, carefully selected to inspire and
          entertain. Join us on this journey of knowledge and imagination.
        </p>
        <img src={bookshelvesImage} alt="Cozy Reading Space" className="about-img" />
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="features">
          <div className="feature">📚 Wide Collection</div>
          <div className="feature">🚀 Fast Delivery</div>
          <div className="feature">💰 Best Prices</div>
        </div>
      </section>

      {/* Contact Us Form */}
      <section className="contact-us">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={errors.name ? "error" : ""}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={errors.email ? "error" : ""}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <input
            type="text"
            placeholder="Subject"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            className={errors.subject ? "error" : ""}
          />
          {errors.subject && <p className="error-message">{errors.subject}</p>}

          <textarea
            placeholder="Message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className={errors.message ? "error" : ""}
          />
          {errors.message && <p className="error-message">{errors.message}</p>}

          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default HomePage;
