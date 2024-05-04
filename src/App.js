import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Componetes/Header/index';
import Footer from './Componetes/Footer/index';
import Cadastro from './Paginas/Cadastro/index';
import Login from './Paginas/Login/index';
import Mapa from './Componetes/Mapa/mapa';
import './App.css';

const App = () => {
  const handleCadastro = (userData) => {
    console.log('Dados do usuário:', userData); 
  };

  const handleLogin = (userData) => {
    console.log('Dados do usuário:', userData)
  }

  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/cadastro" element={<Cadastro onCadastro={handleCadastro} />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
