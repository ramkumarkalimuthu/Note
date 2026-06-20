import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Notes App
        </Link>

          {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
 {/* Navbar Links */}
        <div className="collapse navbar-collapse navbar-nav ms-auto justify-content-end" id="navbarNav">
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/profile">
            Profile
          </Link>

          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/register">
            Register
          </Link>
          <button className="btn btn-outline-light ms-2">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar