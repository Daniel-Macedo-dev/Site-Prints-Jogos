import Login from "../components/Login";
import Signup from "../components/Signup";

export default function AuthPage({ onLogin }) {
  return (
    <div className="auth-grid">
      <div className="auth-container">
        <h2 className="mb-3 text-center">Login</h2>
        <Login onLoginSuccess={onLogin} />
      </div>

      <div className="signup-container">
        <h2 className="mb-3 text-center">Cadastro</h2>
        <Signup onLogin={onLogin} />
      </div>
    </div>
  );
}
