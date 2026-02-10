import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar({ isLoggedIn, onLogout }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav className="navbar bg-dark shadow">
      <div className="container navbar-inner">
        <Link className="navbar-brand" to="/">
          Prints Jogos
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Galeria
              </Link>
            </li>

            {isLoggedIn ? (
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={onLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/auth">
                  Login / Cadastro
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
