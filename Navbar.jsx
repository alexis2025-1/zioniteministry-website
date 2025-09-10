import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/events", label: "Events" },
    { path: "/gallery", label: "Gallery" },
    { path: "/prayer-room", label: "Prayer Room" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav>
      {navLinks.map(link => (
        <Link
          key={link.path}
          to={link.path}
          className={location.pathname === link.path ? "active" : ""}
        >
          {link.label}
        </Link>
      ))}
      {auth.token ? (
        <>
          <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>Dashboard</Link>
          <button style={{ background: "#b52e2e", color: "#fff", border: "none", marginLeft: "1rem", borderRadius: "6px", padding: "0.5rem 1rem" }} onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
