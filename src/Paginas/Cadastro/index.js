import React, { useState } from 'react';
import './../Cadastro/styles.css';

function Cadastro () {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCadastro = () => {
    if (!validarEmail(email)){
      alert('Email inválido. Por favor, insira um email válido.');
      return false;
    }

    if (!nome || !email || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const userData = { nome, email, password };
    localStorage.setItem('userData', JSON.stringify(userData))
    

    setTimeout(() => {
      window.location.href = '/Login';
    }, 100);

  };

  // Expressão regular para validar o formato do email
  function validarEmail(inputEmail) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(inputEmail);
  }


  return (
    <div className='cadastro-container'>
      <h2>Cadastro</h2>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleCadastro}>Cadastrar</button>
      <a href='/Login'>Fazer Login</a>
    </div>
  );
};

export default Cadastro;
