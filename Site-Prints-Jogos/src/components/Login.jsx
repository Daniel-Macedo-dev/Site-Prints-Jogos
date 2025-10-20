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
      localStorage.setItem("token", token); // salva token
      setStatus("Login realizado!");
      onLoginSuccess(); // chama callback para mostrar galeria/upload
    } catch (err) {
      setStatus("Erro no login: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
      <button onClick={handleLogin}>Entrar</button>
      <p className="status">{status}</p>
    </div>
  );
}
