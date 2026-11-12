import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to={user ? "/products" : "/login"}>
          <span className="brand-dot">●</span> MERN SHOPPING APP
        </Link>
      </div>

      <div className="nav-links">
        {user ? (
          <>
            <Link to="/products" className="nav-link">
              Products
            </Link>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            <span className="user-badge">Hi, {user.username}</span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link btn-highlight">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

