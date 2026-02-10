import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ isLoggedIn, onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={() => setOpen(false)}>
          Prints Jogos
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${open ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={onLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/auth" onClick={() => setOpen(false)}>
                  Login / Signup
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
