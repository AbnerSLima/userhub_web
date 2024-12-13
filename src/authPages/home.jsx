import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const navigate = useNavigate();

  const usuarios = [
    { user_id: 1, nome: "João", login: "joao123", senha: "12345", data_cadastro: "2024-11-01" }
  ];

  const handleCreate = () => {
    navigate("/create");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleEditar = () => {
    navigate("/edit");
  };

  const handleExcluir = (id) => {
    console.log(`Excluir usuário ID: ${id}`);
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
          <button onClick={handleCreate} className="add-button">
            Adicionar Usuário
          </button>
        </div>
      </header>

      <div className="search-container">
        <input
          type="text"
          placeholder="Digite o nome ou login"
          className="input"
        />
        <button className="search-button">Buscar</button>
        <button className="search-clean">Limpar filtro</button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Login</th>
            <th>Data de Cadastro</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.user_id}>
              <td>{usuario.user_id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.login}</td>
              <td>{usuario.data_cadastro}</td>
              <td>
                <button className="action-button view" onClick={handleProfile}>
                  Visualizar
                </button>
                <button className="action-button edit" onClick={handleEditar}>
                  Editar
                </button>
                <button
                  className="action-button delete"
                  onClick={() => handleExcluir(usuario.user_id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;