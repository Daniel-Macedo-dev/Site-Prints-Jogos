import { useState } from "react";
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
      const token = res.data;
      localStorage.setItem("token", token);
      setStatus("Login realizado!");
      onLoginSuccess();
    } catch (err) {
      setStatus("Erro no login: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="card p-4 shadow-sm" style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2 className="text-center mb-3">Login</h2>
      <input className="form-control mb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="form-control mb-2" type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
      <button className="btn btn-primary w-100" onClick={handleLogin}>Entrar</button>
      <p className="text-danger mt-2">{status}</p>
    </div>
  );
}
