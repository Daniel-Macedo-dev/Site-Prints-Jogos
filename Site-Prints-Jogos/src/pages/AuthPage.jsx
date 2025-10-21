import React from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

export default function AuthPage({ onLogin }) {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Bem-vindo ao Prints Jogos</h1>
      <div className="row">
        <div className="col-md-6">
          <Login onLoginSuccess={onLogin} />
        </div>
        <div className="col-md-6">
          <Signup onLogin={onLogin} />
        </div>
      </div>
    </div>
  );
}
