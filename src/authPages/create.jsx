import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";


function Create() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("nomeUsuario");
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
      const nome = localStorage.getItem("nomeUsuario");
      if (!nome) {
        navigate("/");
      return;
    }
  }, [navigate]);

  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [nomeUsuario, setnomeUsuario] = useState("");

  const homePage = () => {
    navigate("/home");
  };

  const handleCreate = async () => {
    if (!nome || !login || !senha) {
      alert("Todos os campos são obrigatórios!");
      return;
    }
  
    try {
      const response = await fetch("https://savir11.tecnologia.ws/userhub/create.php", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ nome, login, senha }),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(data.message || "Usuário criado com sucesso!");
        setNome("");
        setLogin("");
        setSenha("");
        //navigate("/home");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Erro ao criar usuário.");
      }
    } catch (error) {
      console.error("Erro na criação do usuário:", error);
      alert("Erro ao criar usuário. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="container">
      <header className="header">
      <div>
          <img src="/logo2.png" alt="Logo" className="logo_header" />
        </div>
        <div className="user-actions">
          <div className="text-welcome">
            <p>Olá</p><p>{nomeUsuario || "Visitante"}!</p>
          </div>
          <button 
            className="link"
            onClick={handleLogout}>
            Sair
          </button>
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
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="Digite seu usuário..."
          className="input"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          placeholder="Digite sua senha..."
          className="input"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button onClick={handleCreate} className="button save-button">
          Salvar
        </button>
      </main>
    </div>
  );
}

export default Create;