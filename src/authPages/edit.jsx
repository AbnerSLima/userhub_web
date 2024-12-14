import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import "./edit.css";

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`https://savir11.tecnologia.ws/userhub/readById.php?id=${id}`);
        if (!response.ok) {
          throw new Error(`Erro ao buscar usuário: ${response.status}`);
        }
        const data = await response.json();
        setNome(data.nome);
        setLogin(data.login);
      } catch (error) {
        console.error("Erro ao carregar os dados do usuário:", error);
      }
    };

    fetchUsuario();
  }, [id]);
  
  const handleSave = async () => {
    console.log("Editando usuário...");
    try {
      const response = await fetch("https://savir11.tecnologia.ws/userhub/update.php", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ user_id: id, nome, login, senha, }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar usuário");
      }

      const data = await response.json();
      console.log("Usuário atualizado com sucesso:", data.message);
      navigate("/home");
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  };

  const homePage = () => {
    navigate("/home");
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
        <h1 className="title">Editar usuário</h1>
        <input
          type="text"
          placeholder="Carregando..."
          className="input"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Carregando..."
          className="input"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          placeholder="Digite sua nova senha..."
          className="input"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button onClick={handleSave} className="button alter-button">
          Alterar
        </button>
      </main>
    </div>
  );
}

export default Edit;