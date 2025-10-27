import { useState } from "react";
import axios from "axios";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) return setStatus("Preencha todos os campos");
    try {
      const res = await axios.post("http://localhost:8080/auth/login", { email, senha });
      localStorage.setItem("token", res.data);
      setStatus("Login realizado!");
      onLoginSuccess();
    } catch (err) {
      setStatus("Erro: " + (err.response?.data || err.message));
    }
  };

  return (
    <>
      <input type="email" placeholder="Email" className="form-control mb-2" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" className="form-control mb-2" value={senha} onChange={e=>setSenha(e.target.value)} />
      <button className="btn btn-outline-light w-100" onClick={handleLogin}>Entrar</button>
      <p className="mt-2">{status}</p>
    </>
  );
}
