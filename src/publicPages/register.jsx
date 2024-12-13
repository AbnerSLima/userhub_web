import { useState } from 'react';
import { Link } from "react-router-dom";
import userHubLogo1 from '/logo1.png'

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUp() {
    if (!name || !email || !password) {
      alert('Erro: Todos os campos são obrigatórios!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: name,
          login: email,
          senha: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Sucesso: Conta criada com sucesso!');
        // Redirecionar para a tela de login
      } else {
        alert(`Erro: ${data.message || 'Não foi possível criar a conta.'}`);
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
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Digite seu usuário..."
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