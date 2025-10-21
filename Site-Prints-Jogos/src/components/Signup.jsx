import React, { useState } from "react";
import axios from "axios";

export default function Signup({ onLogin }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [status, setStatus] = useState("");

  const handleSignup = async () => {
    if (!nome || !email || !senha) {
      setStatus("Preencha todos os campos");
      return;
    }

    try {
      setStatus("Criando conta...");
      await axios.post("http://localhost:8080/auth/signup", { nome, email, senha });

      const loginRes = await axios.post("http://localhost:8080/auth/login", { email, senha });
      localStorage.setItem("token", loginRes.data);
      setStatus("Cadastro concluído!");
      onLogin();
    } catch (err) {
      setStatus("Erro: " + (err.response?.data || err.message));
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} className="form-control mb-2" />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-2" />
      <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} className="form-control mb-2" />
      <button onClick={handleSignup} className="btn btn-primary">Cadastrar</button>
      <p>{status}</p>
    </div>
  );
}
