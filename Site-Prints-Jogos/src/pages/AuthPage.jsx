import React, { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

export default function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Bem-vindo ao Prints Jogos</h1>
      <div className="d-flex justify-content-center mb-3">
        <button className="btn btn-primary me-2" onClick={() => setShowLogin(true)}>Login</button>
        <button className="btn btn-secondary" onClick={() => setShowLogin(false)}>Cadastro</button>
      </div>
      {showLogin ? <Login /> : <Signup />}
    </div>
  );
}
