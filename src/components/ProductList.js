import React, { useState } from "react";
import { useCart } from "../context/CartContext"; // Import Cart Context
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/ProductList.css";

// Import book images
import Book1 from "../assets/image/book1.png";
import Book2 from "../assets/image/book2.png";
import Book3 from "../assets/image/book3.png";
import Book4 from "../assets/image/book4.png";
import Book5 from "../assets/image/book5.jpeg";
import Book6 from "../assets/image/book6.jpeg";
import Book7 from "../assets/image/book7.jpeg";
import Book8 from "../assets/image/book8.jpeg";
import Book9 from "../assets/image/book9.jpeg";
import Book10 from "../assets/image/book10.jpeg";
import Book11 from "../assets/image/book11.jpeg";
import Book12 from "../assets/image/book12.jpeg";

const categories = {
  Fiction: [
    { id: 1, title: "Simple way of peace life", author: "Armor Ramsey", price: 40.0, image: Book1 },
    { id: 2, title: "Once upon a time and Moree ", author: "Klien Marry", price: 35.0, image: Book4 },
    { id: 3, title: "The Enchanted Forest", author: "Maggie Brown", price: 50.0, image: Book9 },
    { id: 4, title: "Echoes of the Past and Moree", author: "Jonathan Reed", price: 55.0, image: Book10 },
  ],
  "Non-Fiction": [
    { id: 5, title: "Great Travel at Desert", author: "Sanchit Howdy", price: 38.0, image: Book2 },
    { id: 6, title: "The Lady Beauty Scarlett", author: "Arthur Doyle", price: 45.0, image: Book3 },
    { id: 7, title: "Mindset Matters More", author: "Caroline Hughes", price: 48.0, image: Book11 },
    { id: 8, title: "The Art of Focus and Moree", author: "Nathan Sterling", price: 52.0, image: Book12 },
  ],
  SciFi: [
    { id: 9, title: "Future of AI and Moreee", author: "John Maxwell", price: 50.0, image: Book5 },
    { id: 10, title: "Galactic Wars Moreee", author: "Alex Ray", price: 60.0, image: Book6 },
    { id: 11, title: "Neon City Chronicles", author: "Mia Carter", price: 65.0, image: Book7 },
    { id: 12, title: "Space Odyssey 3000 and Moree", author: "Luke Anderson", price: 70.0, image: Book8 },
  ],
  Mystery: [
    { id: 13, title: "The Hidden Truth More", author: "Emily Carter", price: 55.0, image: Book7 },
    { id: 14, title: "Detective’s Case More", author: "Robert Holmes", price: 48.0, image: Book8 },
    { id: 15, title: "Whispering Shadows More", author: "Olivia Spencer", price: 58.0, image: Book9 },
    { id: 16, title: "The Silent Witness More", author: "Henry Blackwood", price: 62.0, image: Book10 },
  ],
};

const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart(); // Get addToCart function from Context

  // Filter books based on search query
  const filteredCategories = Object.entries(categories).reduce((acc, [category, books]) => {
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredBooks.length > 0) acc[category] = filteredBooks;
    return acc;
  }, {});

  return (
    <div className="container page-content">
      <h2 className="text-center mb-4">Explore Our Book Collection</h2>

      {/* Search Bar */}
      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="🔍 Search books by title..."
          className="form-control w-50 mx-auto search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Display categories */}
      {Object.keys(filteredCategories).map((category) => (
        <div key={category} className="category-section">
          <h3 className="category-title">{category}</h3>
          <div className="scroll-container">
            {filteredCategories[category].map((book) => (
              <div key={book.id} className="book-card">
                <img src={book.image} alt={book.title} className="book-image" />
                <h5 className="book-title">{book.title}</h5>
                <p className="book-author">{book.author}</p>
                <div className="book-price">₹{book.price.toFixed(2)}</div>
                <button className="btn btn-primary add-to-cart" onClick={() => addToCart(book)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
