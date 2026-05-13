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
      <input
        type="email"
        placeholder="Email"
        className="form-control mb-2"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        className="form-control mb-2"
        value={senha}
        onChange={e => setSenha(e.target.value)}
      />
      <button className="btn btn-outline-light w-100" onClick={handleLogin}>
        Entrar
      </button>
      {status && <p className="status">{status}</p>}
    </>
  );
}
