import { useState } from "react";
import axios from "axios";

export default function Signup({ onLogin }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [status, setStatus] = useState("");

  const handleSignup = async () => {
    if (!nome || !email || !senha) return setStatus("Preencha todos os campos");
    try {
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
    <>
      <input type="text" placeholder="Nome" className="form-control mb-2" value={nome} onChange={e=>setNome(e.target.value)} />
      <input type="email" placeholder="Email" className="form-control mb-2" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" className="form-control mb-2" value={senha} onChange={e=>setSenha(e.target.value)} />
      <button className="btn btn-outline-light w-100" onClick={handleSignup}>Cadastrar</button>
      <p className="mt-2">{status}</p>
    </>
  );
}
