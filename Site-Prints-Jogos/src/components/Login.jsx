import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !senha) {
      setStatus("Preencha todos os campos");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/auth/login", { email, senha });
      localStorage.setItem("token", res.data);
      setStatus("Login realizado!");
      navigate("/");
    } catch (err) {
      setStatus("Erro no login: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="card p-4">
      <input className="form-control mb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="form-control mb-2" type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
      <button className="btn btn-primary w-100" onClick={handleLogin}>Entrar</button>
      {status && <p className="mt-2 text-danger">{status}</p>}
    </div>
  );
}
