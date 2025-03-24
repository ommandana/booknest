import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const defaultProfile = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    zipcode: "",
    city: "",
    state: "",
    country: "",
    phone: "",
  };

  const [formData, setFormData] = useState(() => {
    return JSON.parse(localStorage.getItem("profile")) || defaultProfile;
  });

  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstname.trim()) newErrors.firstname = "First name is required";
    if (!formData.lastname.trim()) newErrors.lastname = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.zipcode.trim()) newErrors.zipcode = "Zip code is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number (10 digits required)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    alert("Profile updated successfully!");
    setEditMode(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      setFormData(defaultProfile);
      localStorage.removeItem("profile");
      alert("Profile deleted!");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("profile");
      alert("navigating you to logout");
      navigate("/login");
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-card">
        {editMode ? (
          <form onSubmit={handleUpdate} className="profile-form">
            {[
              { label: "First Name", name: "firstname" },
              { label: "Last Name", name: "lastname" },
              { label: "Email", name: "email", type: "email" },
              { label: "Password", name: "password", type: "password" },
              { label: "Address", name: "address" },
              { label: "Zip Code", name: "zipcode" },
              { label: "City", name: "city" },
              { label: "State", name: "state" },
              { label: "Country", name: "country" },
              { label: "Phone", name: "phone" },
            ].map(({ label, name, type = "text" }) => (
              <div className="input-group" key={name}>
                <label>{label}:</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                />
                {errors[name] && <span className="error">{errors[name]}</span>}
              </div>
            ))}
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
          </form>
        ) : (
          <div>
            <p><strong>Name:</strong> {formData.firstname || "N/A"} {formData.lastname || ""}</p>
            <p><strong>Email:</strong> {formData.email || "N/A"}</p>
            <p><strong>Address:</strong> {formData.address || "N/A"}, {formData.city || ""}, {formData.state || ""}, {formData.zipcode || ""}, {formData.country || ""}</p>
            <p><strong>Phone:</strong> {formData.phone || "N/A"}</p>
            <button className="edit-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
            <button className="delete-btn" onClick={handleDelete}>Delete Profile</button>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ✅ **Enhanced CSS**
const cssStyles = `
.profile-container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  text-align: center;
  background: #f8f1f1;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
.profile-card {
  padding: 15px;
  border-radius: 8px;
  background: #fff;
  text-align: left;
}
.input-group {
  margin-bottom: 10px;
}
.input-group label {
  display: block;
  font-weight: bold;
  color: #6d4c41;
}
.input-group input {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.error {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}
button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
}
.edit-btn { background: #8D6E63; color: white; }
.save-btn { background: #4CAF50; color: white; }
.cancel-btn { background: #757575; color: white; }
.delete-btn { background: #D32F2F; color: white; }
.logout-btn { background: #FF9800; color: white; }
`;

// ✅ Add styles dynamically
const styleSheet = document.createElement("style");
styleSheet.innerText = cssStyles;
document.head.appendChild(styleSheet);

export default Profile;
