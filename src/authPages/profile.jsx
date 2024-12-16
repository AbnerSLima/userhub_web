import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams  } from "react-router-dom";
import "./profile.css";

function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
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

    const fetchUser = async () => {
      try {
        const response = await fetch(`https://savir11.tecnologia.ws/userhub/read.php?id=${id}`);
        if (response.ok) {
          const user = await response.json();
          setUserData(user);
        } else {
          alert("Usuário não encontrado!");
          
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        alert("Erro ao carregar os dados do usuário.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const homePage = () => {
    navigate("/home");
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
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
        <h1 className="title">Dados do usuário</h1>
        <div className="user-details">
          {isLoading ? (
            <div className="loading-container">
            <div className="spinner"></div>
          </div>
          ) : (
            <>
              <div><strong>ID:</strong> {userData.user_id}</div>
              <div><strong>Nome:</strong> {userData.nome}</div>
              <div><strong>Login:</strong> {userData.login}</div>
              <div><strong>Criado em:</strong> {new Date(userData.created_at).toLocaleDateString()}</div>
            </>
          )}
        </div>
        <button onClick={handleEdit} className="button edit-button">
          Editar
        </button>
      </main>
    </div>
  );
}

export default Profile;