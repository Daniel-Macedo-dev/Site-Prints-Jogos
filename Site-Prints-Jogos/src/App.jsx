import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/auth" />} />
          <Route path="/auth" element={!isLoggedIn ? <AuthPage onLogin={handleLogin} /> : <Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}