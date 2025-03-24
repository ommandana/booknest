import React, { useState, useEffect } from "react";
import "../style/RegisteredUsers.css";

const RegisteredUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    setUsers(storedUsers);
  }, []);

  // Filter users based on search and role
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) &&
    (roleFilter === "all" || user.role === roleFilter)
  );

  return (
    <div className="registered-users-container">
      <h2>Registered Users</h2>

      {/* Search Input */}
      <input 
        type="text" 
        placeholder="Search by Name" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        className="search-input"
      />

      {/* Role Filter Dropdown */}
      <select onChange={(e) => setRoleFilter(e.target.value)} className="filter-dropdown">
        <option value="all">All Roles</option>
        <option value="Admin">Admin</option>
        <option value="User">User</option>
        <option value="Seller">Seller</option>
      </select>

      {/* User List */}
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className={`role-${user.role.toLowerCase()}`}>{user.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RegisteredUsers;
