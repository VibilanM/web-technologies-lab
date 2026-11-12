import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Profile from "./pages/Profile";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("mern_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("mern_token") || "";
  });

  const handleLogin = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("mern_user", JSON.stringify(userData));
    localStorage.setItem("mern_token", userToken);
  };

  const handleUpdateUser = (updatedUserData) => {
    const updated = { ...user, ...updatedUserData };
    setUser(updated);
    localStorage.setItem("mern_user", JSON.stringify(updated));
  };

  const handleLogout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("mern_user");
    localStorage.removeItem("mern_token");
  };

  return (
    <div className="app-container">
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        {/* Default route */}
        <Route
          path="/"
          element={user ? <Navigate to="/products" replace /> : <Navigate to="/login" replace />}
        />

        {/* Page 1: User Registration */}
        <Route path="/register" element={<Register />} />

        {/* Page 2: User Login */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Page 3: Products Display */}
        <Route path="/products" element={<Products user={user} token={token} />} />

        {/* Section 3: Profile Management (PUT, PATCH, DELETE) */}
        <Route
          path="/profile"
          element={
            <Profile
              user={user}
              onUpdateUser={handleUpdateUser}
              onLogout={handleLogout}
            />
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;

