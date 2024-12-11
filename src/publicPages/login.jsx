import { useState } from 'react'
import userHubLogo1 from '/logo1.png'
import { BrowserRouter as Route, useNavigate, Link, Router, Routes } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigate("/Home");
  };

  return (
    <>
        <div>
          <Link target="_blank">
            <img src={userHubLogo1} className="logo" alt="UserHub logo" />
          </Link>
        </div>
        <h1 className="title">Bem-vindo</h1>
        <div className="card">
          <input
            type='email'
            placeholder="Digite seu e-mail..."
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          <input
            type="password"
            placeholder="Digite sua senha..."
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          <button className="button" onClick={handleLogin}>
            Entrar
          </button>
          <a>
            <p className="link">Esqueci minha senha</p>
          </a>
          <a>
            <p className="link">Ainda não tem conta? Cadastre-se!</p>
          </a>
        </div>
    </>
  )
}

export default Login;