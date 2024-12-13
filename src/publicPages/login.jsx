import { useState } from 'react'
import userHubLogo1 from '/logo1.png'
import { BrowserRouter as Route, useNavigate, Link, Router, Routes } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigate("/Home");
  };

  const handleRegister = () => {
    navigate("/Register");
  };

  return (
    <>
      <div className='card'>
          <Link>
            <img src={userHubLogo1} className="logo" alt="UserHub logo" />
          </Link>
        <h1 className="title">Bem-vindo</h1>
        <div className="card">
          <input
            type='email'
            className="input"
            placeholder="Digite seu e-mail..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          <input
            type="password"
            className="input"
            placeholder="Digite sua senha..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          <button className="button" onClick={handleLogin}>
            Entrar
          </button>
            <p>Ainda não tem conta?</p>
          <button onClick={handleRegister} className="link">
            Cadastre-se!
          </button>
        </div>
      </div>
    </>
  )
}

export default Login;