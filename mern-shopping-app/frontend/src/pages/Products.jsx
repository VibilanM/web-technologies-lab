import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Products({ user, token }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Only logged-in users fetch products
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        // HTTP GET method ONLY with auth header
        const response = await fetch("/api/products", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token || user.emailId}`,
            "x-user-email": user.emailId
          }
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setProducts(data.data || []);
        } else {
          setError(data.message || "Failed to retrieve products from backend.");
        }
      } catch (err) {
        setError("Network error while connecting to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user, token]);

  if (!user) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Access Denied</h2>
          <p className="auth-subtitle">
            Unauthenticated users cannot access the product catalog directly.
          </p>
          <div className="alert alert-danger">
            <p>Please log in with your registered account to continue.</p>
          </div>
          <Link to="/login" className="btn-submit" style={{ textAlign: "center", display: "block" }}>
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="main-content">
      <div className="page-header">
        <div>
          <h2>Page 3: Products Display</h2>
          <p className="welcome-banner">
            Welcome back, <strong>{user.username}</strong> ({user.emailId})
          </p>
        </div>
        <div className="header-actions">
          <Link to="/profile" className="btn-secondary">
            Manage Profile
          </Link>
        </div>
      </div>

      {loading && <div className="info-banner">Loading products from MongoDB...</div>}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && products.length === 0 && (
        <div className="info-banner">
          <p>No products are currently available in the database.</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.productId || product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Products;

