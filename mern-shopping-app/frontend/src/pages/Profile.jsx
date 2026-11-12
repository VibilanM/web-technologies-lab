import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile({ user, onUpdateUser, onLogout }) {
  const navigate = useNavigate();

  // State for PUT (complete update)
  const [putData, setPutData] = useState({
    username: user ? user.username : "",
    age: user ? user.age || "" : "",
    password: ""
  });

  // State for PATCH (partial update)
  const [patchField, setPatchField] = useState("username");
  const [patchValue, setPatchValue] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Access Denied</h2>
          <p className="auth-subtitle">Please log in to manage your profile.</p>
          <Link to="/login" className="btn-submit" style={{ textAlign: "center", display: "block" }}>
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // Handle PUT Operation - Update Complete Details
  const handlePutSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`/api/users?emailId=${encodeURIComponent(user.emailId)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: putData.username,
          age: Number(putData.age),
          password: putData.password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage(data.message || "Complete profile updated successfully via PUT.");
        onUpdateUser(data.data);
        setPutData((prev) => ({ ...prev, password: "" }));
      } else {
        setError(data.message || "Failed to update profile via PUT.");
      }
    } catch (err) {
      setError("Network error connecting to backend.");
    } finally {
      setLoading(false);
    }
  };

  // Handle PATCH Operation - Update Selected Details
  const handlePatchSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!patchValue.trim()) {
      setError("Please provide a value to update.");
      return;
    }

    setLoading(true);

    try {
      const body = {};
      if (patchField === "age") {
        body.age = Number(patchValue);
      } else {
        body[patchField] = patchValue;
      }

      const response = await fetch(`/api/users?emailId=${encodeURIComponent(user.emailId)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage(data.message || "Selected profile field updated successfully via PATCH.");
        onUpdateUser(data.data);
        setPatchValue("");
      } else {
        setError(data.message || "Failed to update selected field via PATCH.");
      }
    } catch (err) {
      setError("Network error connecting to backend.");
    } finally {
      setLoading(false);
    }
  };

  // Handle DELETE Operation - Delete User Details
  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the user record for ${user.emailId}? This action cannot be undone.`
    );
    if (!confirmed) return;

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`/api/users?emailId=${encodeURIComponent(user.emailId)}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(data.message || "User record successfully deleted.");
        onLogout();
        navigate("/register");
      } else {
        setError(data.message || "Failed to delete user record.");
      }
    } catch (err) {
      setError("Network error connecting to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main-content">
      <div className="page-header">
        <div>
          <h2>Section 3: User Profile Management</h2>
          <p className="welcome-banner">REST API Operations (PUT, PATCH, DELETE)</p>
        </div>
        <div className="header-actions">
          <Link to="/products" className="btn-secondary">
            &larr; Back to Products
          </Link>
        </div>
      </div>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="profile-grid">
        {/* Current Details Card */}
        <div className="profile-card current-info">
          <h3>Current Registration Details</h3>
          <div className="info-row">
            <span className="label">Username:</span>
            <span className="value">{user.username}</span>
          </div>
          <div className="info-row">
            <span className="label">Email ID:</span>
            <span className="value">{user.emailId}</span>
          </div>
          <div className="info-row">
            <span className="label">Age:</span>
            <span className="value">{user.age}</span>
          </div>

          <div className="danger-zone">
            <h4>C. DELETE Operation</h4>
            <p>Delete user's registration record from MongoDB.</p>
            <button onClick={handleDelete} className="btn-danger" disabled={loading}>
              Delete Account (DELETE)
            </button>
          </div>
        </div>

        {/* PUT Operation Card */}
        <div className="profile-card">
          <h3>A. PUT Operation — Update Complete Details</h3>
          <p className="card-hint">
            Endpoint: <code>PUT /api/users?emailId={user.emailId}</code>
          </p>
          <form onSubmit={handlePutSubmit} className="auth-form">
            <div className="form-group">
              <label>Updated Username</label>
              <input
                type="text"
                value={putData.username}
                onChange={(e) => setPutData({ ...putData, username: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Updated Age</label>
              <input
                type="number"
                value={putData.age}
                onChange={(e) => setPutData({ ...putData, age: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Updated / Current Password</label>
              <input
                type="password"
                placeholder="Enter password to confirm PUT"
                value={putData.password}
                onChange={(e) => setPutData({ ...putData, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Updating..." : "Execute PUT (Complete Update)"}
            </button>
          </form>
        </div>

        {/* PATCH Operation Card */}
        <div className="profile-card">
          <h3>B. PATCH Operation — Update Selected Details</h3>
          <p className="card-hint">
            Endpoint: <code>PATCH /api/users?emailId={user.emailId}</code>
          </p>
          <form onSubmit={handlePatchSubmit} className="auth-form">
            <div className="form-group">
              <label>Select Field to Update</label>
              <select
                value={patchField}
                onChange={(e) => {
                  setPatchField(e.target.value);
                  setPatchValue("");
                }}
              >
                <option value="username">Username</option>
                <option value="age">Age</option>
                <option value="password">Password</option>
              </select>
            </div>
            <div className="form-group">
              <label>New Value for {patchField}</label>
              <input
                type={patchField === "password" ? "password" : patchField === "age" ? "number" : "text"}
                placeholder={`Enter new ${patchField}`}
                value={patchValue}
                onChange={(e) => setPatchValue(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Updating..." : `Execute PATCH (${patchField})`}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Profile;

