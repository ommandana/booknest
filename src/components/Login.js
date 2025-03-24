import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (email === "admin@gmail.com" && password === "admin99") {
      localStorage.setItem("loggedInUser", JSON.stringify({ email, role: "admin" }));
      navigate("/admindashboard/manage-books");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userFound = storedUsers.find((user) => user.email === email && user.password === password);

    if (userFound) {
      localStorage.setItem("loggedInUser", JSON.stringify({ email: userFound.email, role: "user" }));
      setLoggedInUser({ email: userFound.email, role: "user" });
      navigate("/home");
    } else {
      setError("Invalid credentials or user not registered.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/register");
  };

  return (
    <div className="container mt-4">
      <h2>Login Page</h2>

      {loggedInUser ? (
        <div>
          <h4>You're logged in as {loggedInUser?.email}</h4>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;
