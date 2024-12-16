import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [nomeUsuario, setnomeUsuario] = useState("");

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
    setnomeUsuario(nome);

    const fetchUsuarios = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://savir11.tecnologia.ws/userhub/read.php");
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const handleCreate = () => {
    navigate("/create");
  };

  const handleProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  const handleEditar = (id) => {
    navigate(`/edit/${id}`);

  };

  const handleExcluir = async (id, nome) => {
    const confirmDelete = window.confirm(`Você tem certeza que deseja excluir o usuário ${nome}?`);
    
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch("https://savir11.tecnologia.ws/userhub/delete.php", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ user_id: id }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setUsuarios(usuarios.filter((usuario) => usuario.user_id !== id));
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert("Ocorreu um erro ao tentar excluir o usuário.");
    }
  };

  const handleLimparFiltro = () => {
    setSearchTerm("");
  };

  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.login.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <button onClick={handleCreate} className="add-button">
            Adicionar Usuário
          </button>
        </div>
      </header>

      <div className="search-container">
        <input
          type="text"
          placeholder="Digite o nome ou usuário"
          className="input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-clean" onClick={handleLimparFiltro}>Limpar filtro</button>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      ) : (
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Usuário</th>
            <th>Data de Cadastro</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsuarios.map((usuario) => (
            <tr key={usuario.user_id}>
              <td>{usuario.user_id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.login}</td>
              <td>{usuario.created_at}</td>
              <td>
                <button className="action-button view" onClick={() => handleProfile(usuario.user_id)}>
                  Visualizar
                </button>
                <button className="action-button edit" onClick={() => handleEditar(usuario.user_id)}>
                  Editar
                </button>
                <button className="action-button delete" onClick={() => handleExcluir(usuario.user_id, usuario.nome)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
}

export default Home;