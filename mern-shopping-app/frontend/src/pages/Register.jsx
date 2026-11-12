import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    emailId: "",
    age: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear alerts on change
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.username,
          emailId: formData.emailId,
          age: Number(formData.age),
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage(data.message || `Successfully registered! Welcome, ${formData.username}.`);
        setFormData({
          username: "",
          emailId: "",
          age: "",
          password: ""
        });
      } else {
        setError(data.message || "Registration failed. Please check your inputs.");
      }
    } catch (err) {
      setError("Failed to connect to the backend server. Please make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Page 1: User Registration</h2>
        <p className="auth-subtitle">Create your account to start shopping</p>

        {message && (
          <div className="alert alert-success">
            <p>{message}</p>
            <Link to="/login" className="btn-link">Proceed to Login &rarr;</Link>
          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="e.g. Raghavendra"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="emailId">Email ID</label>
            <input
              type="email"
              id="emailId"
              name="emailId"
              placeholder="e.g. raghav@example.com"
              value={formData.emailId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="e.g. 21"
              min="1"
              max="120"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter secure password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="auth-footer">
          Already registered? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;

