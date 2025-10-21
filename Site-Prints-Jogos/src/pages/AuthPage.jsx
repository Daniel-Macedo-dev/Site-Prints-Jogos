import Login from "../components/Login";
import Signup from "../components/Signup";

export default function AuthPage({ onLoginSuccess }) {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Bem-vindo ao Prints Jogos</h1>
      <div className="row">
        <div className="col-md-6">
          <Login onLoginSuccess={onLoginSuccess} />
        </div>
        <div className="col-md-6">
          <Signup onSignupSuccess={onLoginSuccess} />
        </div>
      </div>
    </div>
  );
}
