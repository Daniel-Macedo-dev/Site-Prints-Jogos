import { useState } from "react";
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
      const token = loginRes.data;

      localStorage.setItem("token", token);
      setStatus("Cadastro concluído!");

      onLogin();

    } catch (err) {
      setStatus("Erro: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="signup-container">
      <h2>Cadastro</h2>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={handleSignup}>Cadastrar</button>
      <p>{status}</p>
    </div>
  );
}
