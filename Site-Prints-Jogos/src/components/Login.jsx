import { useState } from "react";
import axios from "axios";
import { API_BASE, getApiErrorMessage } from "../api";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = async () => {
    setStatus("");
    if (!email || !senha) return setStatus("Preencha todos os campos");

    try {
      const res = await axios.post(`${API_BASE}/auth/login`, { email, senha });
      localStorage.setItem("token", res.data);
      setStatus("Login realizado!");
      onLoginSuccess?.();
    } catch (err) {
      setStatus("Erro: " + getApiErrorMessage(err));
    }
  };

  return (
    <>
      <label className="form-label" htmlFor="login-email">Email</label>
      <input
        id="login-email"
        type="email"
        placeholder="seu@email.com"
        className="form-control mb-2"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <label className="form-label" htmlFor="login-senha">Senha</label>
      <input
        id="login-senha"
        type="password"
        placeholder="••••••••"
        className="form-control mb-2"
        value={senha}
        onChange={e => setSenha(e.target.value)}
      />
      <button className="btn btn-outline-light w-100" onClick={handleLogin}>
        Entrar
      </button>
      {status && (
        <p className={`status${status.startsWith("Erro:") ? " status-error" : status === "Login realizado!" ? " status-success" : ""}`}>
          {status}
        </p>
      )}
    </>
  );
}
