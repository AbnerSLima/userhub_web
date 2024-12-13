import { useState } from 'react'
import userHubLogo1 from '/logo1.png'
import { BrowserRouter as Route, useNavigate, Link, Router, Routes } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    if (!login || !senha) {
      alert("Erro: Todos os campos são obrigatórios!");
      return;
    }
  
    try {
      const response = await fetch('https://savir11.tecnologia.ws/userhub/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: login, senha: senha, }),
      });
  
      const data = await response.json();
      console.log(data);
  ;
      if (data.success) {
        alert("Sucesso: Login realizado!");
        navigate("/Home");
      } else {
        alert(`Erro: ${data.error || 'Usuário ou senha inválidos.'}`);
      }
    } catch (error) {
      console.error(error);
      alert("Erro: Algo deu errado. Tente novamente mais tarde.");
    }
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
            type="text"
            className="input"
            placeholder="Digite seu usuário..."
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            />
          <input
            type="password"
            className="input"
            placeholder="Digite sua senha..."
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
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