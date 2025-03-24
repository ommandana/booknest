import { useState} from "react";
import React from "react";
import "../style/ManageBook.css";
const ManageBooks = ({ books, setBooks }) => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    price: "",
    stock: "",
    description: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setBookData({ ...bookData, image: files[0] });
    } else {
      setBookData({ ...bookData, [name]: value });
    }
  };

  // Validate fields before submission
  const validateFields = () => {
    let newErrors = {};
    if (!bookData.title.trim()) newErrors.title = "Title is required.";
    if (!bookData.author.trim()) newErrors.author = "Author is required.";
    if (!bookData.price) newErrors.price = "Price is required.";
    if (!bookData.stock) newErrors.stock = "Stock quantity is required.";
    if (!bookData.description.trim()) newErrors.description = "Description is required.";
    if (!bookData.image) newErrors.image = "Book cover image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Convert USD price to INR (1 USD = 83 INR)
  const convertToRupees = (usd) => (usd * 83).toFixed(2);

  // Handle adding/updating books
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const newBook = {
      ...bookData,
      price: convertToRupees(bookData.price), // Convert price
      image: URL.createObjectURL(bookData.image), // Preview uploaded image
    };

    let updatedBooks;
    if (editingIndex !== null) {
      updatedBooks = [...books];
      updatedBooks[editingIndex] = newBook;
      setEditingIndex(null);
    } else {
      updatedBooks = [...books, newBook];
    }

    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    console.log("Books Updated:", updatedBooks);

    setBookData({ title: "", author: "", price: "", stock: "", description: "", image: null });
  };

  // Handle editing a book
  const handleEdit = (index) => {
    setBookData(books[index]);
    setEditingIndex(index);
  };

  // Handle deleting a book
  const handleDelete = (index) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    console.log("Updated Books:", updatedBooks);
  };

  return (
    <div className="container mt-4">
      <h2>Manage Books</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <input type="text" name="title" placeholder="Title" className="form-control"
            value={bookData.title} onChange={handleChange} />
          {errors.title && <p className="text-danger">{errors.title}</p>}
        </div>

        <div className="mb-3">
          <input type="text" name="author" placeholder="Author" className="form-control"
            value={bookData.author} onChange={handleChange} />
          {errors.author && <p className="text-danger">{errors.author}</p>}
        </div>

        <div className="mb-3">
          <input type="number" name="price" placeholder="Price in USD" className="form-control"
            value={bookData.price} onChange={handleChange} />
          {errors.price && <p className="text-danger">{errors.price}</p>}
        </div>

        <div className="mb-3">
          <input type="number" name="stock" placeholder="Stock Quantity" className="form-control"
            value={bookData.stock} onChange={handleChange} />
          {errors.stock && <p className="text-danger">{errors.stock}</p>}
        </div>

        <div className="mb-3">
          <textarea name="description" placeholder="Description" className="form-control"
            value={bookData.description} onChange={handleChange}></textarea>
          {errors.description && <p className="text-danger">{errors.description}</p>}
        </div>

        <div className="mb-3">
          <input type="file" name="image" className="form-control"
            onChange={handleChange} accept="image/*" />
          {errors.image && <p className="text-danger">{errors.image}</p>}
        </div>

        <button type="submit" className="btn btn-primary">
          {editingIndex !== null ? "Update Book" : "Add Book"}
        </button>
      </form>

      {/* Book List Display */}
      <h3>Books List</h3>
      <ul className="list-group">
        {books.map((book, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <img src={book.image} alt={book.title} className="img-thumbnail me-2" width="50" />
              <strong>{book.title}</strong> by {book.author} - ₹{book.price}  
              <span className="badge bg-secondary ms-2">{book.stock} in stock</span>
              <span className="badge bg-secondary ms-2">{book.description}</span>
            </div>
            <div>
              <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(index)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBooks;
