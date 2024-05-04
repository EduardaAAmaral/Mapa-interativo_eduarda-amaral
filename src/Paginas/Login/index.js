import React, { useState } from 'react';
import './../Login/styles.css';

function Login ({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (!userData) {
      alert('Por favor, faça o cadastro primeiro.');
      window.location.href = '/cadastro';
      return;
    }

    if (email === userData.email && password === userData.password) {
      onLogin({ email, password });
      window.location.href = '/mapa';
    } else {
      alert('Email ou senha inválidos. Por favor, verifique seu email e senha.');
    }

  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      <a href='/cadastro'>Fazer o cadastro</a>
    </div>
  );
};

export default Login;
