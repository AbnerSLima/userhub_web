import { useState } from 'react';
import { Link } from "react-router-dom";
import userHubLogo1 from '/logo1.png'

function Register() {
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSignUp() {
    if (!nome || !login || !senha) {
      alert('Erro: Todos os campos são obrigatórios!');
      return;
    }

    try {
      const response = await fetch('https://savir11.tecnologia.ws/userhub/create.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome,
          login: login,
          senha: senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Sucesso: Conta criada com sucesso!');
        //navigate("/Login");
      } else {
        alert(`Erro: ${data.error || 'Não foi possível criar a conta.'}`);
      }
    } catch (error) {
      console.error(error);
      alert('Erro: Algo deu errado. Tente novamente mais tarde.');
    }
  }

  return (
    <div className='card'>
      <Link>
        <img src={userHubLogo1} className="logo" alt="UserHub logo" />
      </Link>
      <h1 className="title">Criar conta</h1>
      <input
        type="text"
        placeholder="Digite seu nome..."
        className="input"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="text"
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
      <button 
        className="button"
        onClick={handleSignUp}>
          Criar conta
      </button>
      <p>
        Já tem conta? 
      </p>
      <Link 
        to="/"
        className="link">
          Faça login!
      </Link>
    </div>
  );
}

export default Register;