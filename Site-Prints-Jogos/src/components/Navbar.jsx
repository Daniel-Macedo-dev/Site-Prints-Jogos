import { Link } from "react-router-dom";

export default function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <Link className="navbar-brand" to="/">Prints Jogos</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={onLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/auth">Login / Signup</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
