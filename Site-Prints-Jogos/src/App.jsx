import { useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("token")));

  const handleLogin = () => setIsLoggedIn(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const navbarProps = useMemo(
    () => ({ isLoggedIn, onLogout: handleLogout }),
    [isLoggedIn]
  );

  return (
    <div className="app-container">
      <Navbar {...navbarProps} />

      <div className="main-content container">
        <Routes>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
          <Route
            path="/auth"
            element={
              isLoggedIn ? <Navigate to="/" replace /> : <AuthPage onLogin={handleLogin} />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
