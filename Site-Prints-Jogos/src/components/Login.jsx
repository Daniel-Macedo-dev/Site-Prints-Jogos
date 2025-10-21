import React, { useState } from "react";
import axios from "axios";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      setStatus("Preencha todos os campos");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/auth/login", { email, senha });
      localStorage.setItem("token", res.data);
      setStatus("Login realizado!");
      onLoginSuccess();
    } catch (err) {
      setStatus("Erro no login: " + (err.response?.data || err.message));
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-2" />
      <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} className="form-control mb-2" />
      <button onClick={handleLogin} className="btn btn-success">Entrar</button>
      <p>{status}</p>
    </div>
  );
}
