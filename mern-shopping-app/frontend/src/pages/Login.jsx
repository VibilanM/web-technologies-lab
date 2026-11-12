import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    emailId: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          emailId: formData.emailId,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Save user state and token
        onLogin(data.user, data.token || data.user.emailId);
        // Navigate to Products Display page
        navigate("/products");
      } else {
        // Backend returns exact message: "User Not Registered." or "Invalid Password."
        setError(data.message || "Login failed. Please check credentials.");
      }
    } catch (err) {
      setError("Failed to connect to backend server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Page 2: User Login</h2>
        <p className="auth-subtitle">Enter your registered email and password</p>

        {error && (
          <div className="alert alert-danger">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          New user? <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

