import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!nome || !email || !senha) {
      setStatus("Preencha todos os campos");
      return;
    }

    try {
      await axios.post("http://localhost:8080/auth/signup", { nome, email, senha });
      const loginRes = await axios.post("http://localhost:8080/auth/login", { email, senha });
      localStorage.setItem("token", loginRes.data);
      setStatus("Cadastro concluído!");
      navigate("/");
    } catch (err) {
      setStatus("Erro: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="card p-4">
      <input className="form-control mb-2" type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <input className="form-control mb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="form-control mb-2" type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
      <button className="btn btn-success w-100" onClick={handleSignup}>Cadastrar</button>
      {status && <p className="mt-2 text-danger">{status}</p>}
    </div>
  );
}
