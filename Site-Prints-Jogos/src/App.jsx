import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setLoggedIn(true);
  }, []);

  return (
    <Routes>
      {!loggedIn ? (
        <Route path="*" element={<AuthPage onLogin={() => setLoggedIn(true)} />} />
      ) : (
        <Route path="*" element={<HomePage />} />
      )}
    </Routes>
  );
}

export default App;
