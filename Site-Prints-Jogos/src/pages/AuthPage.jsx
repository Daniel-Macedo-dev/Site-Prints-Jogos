import Login from "../components/Login";
import Signup from "../components/Signup";

export default function AuthPage({ onLogin }) {
  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="p-4 bg-dark text-white rounded shadow">
          <h2 className="mb-3 text-center">Login</h2>
          <Login onLoginSuccess={onLogin} />
        </div>
      </div>
      <div className="col-md-5 mt-4 mt-md-0">
        <div className="p-4 bg-dark text-white rounded shadow">
          <h2 className="mb-3 text-center">Cadastro</h2>
          <Signup onLogin={onLogin} />
        </div>
      </div>
    </div>
  );
}
