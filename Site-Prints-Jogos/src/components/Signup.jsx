import { useState } from "react";
import axios from "axios";

export default function Signup({ onSignupSuccess }) {
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

      // Login automático
      const loginRes = await axios.post("http://localhost:8080/auth/login", { email, senha });
      localStorage.setItem("token", loginRes.data);

      setStatus("Cadastro concluído!");
      onSignupSuccess();
    } catch (err) {
      setStatus("Erro: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="card p-4 shadow-sm" style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2 className="text-center mb-3">Cadastro</h2>
      <input className="form-control mb-2" type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <input className="form-control mb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="form-control mb-2" type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
      <button className="btn btn-success w-100" onClick={handleSignup}>Cadastrar</button>
      <p className="text-danger mt-2">{status}</p>
    </div>
  );
}
