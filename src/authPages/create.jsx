import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


function Create() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const homePage = () => {
    navigate("/home");
  };

  const handleCreate = async () => {
    console.log("Criando usuário...");
    // Adicione a lógica para criar usuário
  };

  return (
    <div className="container">
      <header className="header">
      <div>
          <img src="/logo2.png" alt="Logo" className="logo_header" />
        </div>
        <div className="user-actions">
          <div className="text-welcome">
            <p>Olá</p><p>Visitante!</p>
          </div>
          <Link 
            to="/"
            className="link">
            Sair
          </Link>
          <button onClick={homePage} className="button back-button">
            Voltar
          </button>
        </div>
      </header>
      <main className="form-container">
        <h1 className="title">Adicionar usuário</h1>
        <input
          type="text"
          placeholder="Digite seu primeiro nome..."
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Digite seu login..."
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
        <button onClick={handleCreate} className="button save-button">
          Salvar
        </button>
      </main>
    </div>
  );
}

export default Create;