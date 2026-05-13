import { useState } from "react";
import axios from "axios";
import { API_BASE, getApiErrorMessage } from "../api";

export default function Signup({ onLogin }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [status, setStatus] = useState("");

  const handleSignup = async () => {
    setStatus("");
    if (!nome || !email || !senha) return setStatus("Preencha todos os campos");

    try {
      await axios.post(`${API_BASE}/auth/signup`, { nome, email, senha });
      const loginRes = await axios.post(`${API_BASE}/auth/login`, { email, senha });
      localStorage.setItem("token", loginRes.data);
      setStatus("Cadastro concluído!");
      onLogin?.();
    } catch (err) {
      setStatus("Erro: " + getApiErrorMessage(err));
    }
  };

  return (
    <>
      <label className="form-label" htmlFor="signup-nome">Nome</label>
      <input
        id="signup-nome"
        type="text"
        placeholder="Seu nome"
        className="form-control mb-2"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />
      <label className="form-label" htmlFor="signup-email">Email</label>
      <input
        id="signup-email"
        type="email"
        placeholder="seu@email.com"
        className="form-control mb-2"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <label className="form-label" htmlFor="signup-senha">Senha</label>
      <input
        id="signup-senha"
        type="password"
        placeholder="••••••••"
        className="form-control mb-2"
        value={senha}
        onChange={e => setSenha(e.target.value)}
      />
      <button className="btn btn-outline-light w-100" onClick={handleSignup}>
        Cadastrar
      </button>
      {status && (
        <p className={`status${status.startsWith("Erro:") ? " status-error" : status === "Cadastro concluído!" ? " status-success" : ""}`}>
          {status}
        </p>
      )}
    </>
  );
}
