import React from 'react';
import './styles.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Mapa Interativo</h1>
      <nav>
        <ul>
          <li><a href="/login">Login</a></li>
          <li><a href="/cadastro">Cadastro</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
