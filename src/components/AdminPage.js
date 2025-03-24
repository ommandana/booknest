import { useState } from "react";


const AdminPage = () => {
  const [books, setBooks] = useState([]);
  const [bookData, setBookData] = useState({ title: "", author: "", price: "", description: "", image: "", stock: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [users] = useState(["User1", "User2", "User3"]);
  const [orders] = useState(["Order1", "Order2", "Order3"]);

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBookData({ ...bookData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBooks = editingIndex !== null ? [...books] : [...books, bookData];
    if (editingIndex !== null) {
      updatedBooks[editingIndex] = bookData;
      setEditingIndex(null);
    }
    setBooks(updatedBooks);
    console.log("Books: ", updatedBooks);
    setBookData({ title: "", author: "", price: "", description: "", image: "", stock: "" });
  };

  const handleEdit = (index) => {
    setBookData(books[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
    console.log("Updated Books: ", updatedBooks);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Admin - Manage Books</h2>
      <h3 className="text-center mb-4">Add Book</h3>
      <form className="mb-4 p-3 border rounded" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" className="form-control" name="title" placeholder="Book Name" value={bookData.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" name="author" placeholder="Author" value={bookData.author} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="number" className="form-control" name="price" placeholder="Price (₹)" value={bookData.price} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <textarea className="form-control" name="description" placeholder="Description" value={bookData.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="number" className="form-control" name="stock" placeholder="Stock" value={bookData.stock} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="file" className="form-control" name="image" onChange={handleFileChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">{editingIndex !== null ? "Update" : "Add"} Book</button>
      </form>
      
      <h2 className="text-center">Books List</h2>
      <ul className="list-group mb-4">
        {books.map((book, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{book.title}</strong> by {book.author} - ₹{book.price} | Stock: {book.stock}
              <p>{book.description}</p>
            </div>
            {book.image && <img src={book.image} alt={book.title} className="rounded" width="50" height="50" />}
            <div>
              <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(index)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="text-center">Registered Users</h2>
      <ul className="list-group mb-4">
        {users.map((user, index) => (
          <li key={index} className="list-group-item">{user}</li>
        ))}
      </ul>
      
      <h2 className="text-center">Orders & Purchases</h2>
      <ul className="list-group mb-4">
        {orders.map((order, index) => (
          <li key={index} className="list-group-item">{order}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;