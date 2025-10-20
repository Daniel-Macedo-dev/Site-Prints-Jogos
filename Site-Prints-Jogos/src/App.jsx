import { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Gallery from "./components/Gallery";
import Upload from "./components/Upload";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setLoggedIn(true);
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  if (!loggedIn) {
    return (
      <div>
        <h1>Bem-vindo ao Prints Jogos</h1>
        <Login onLoginSuccess={handleLogin} />
        <Signup onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <h1>Prints Jogos</h1>
      <Gallery />
      <Upload />
    </div>
  );
}
