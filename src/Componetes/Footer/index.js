import React from 'react';
import './../Footer/styles.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Mapa Interativo. Todos os direitos reservados.</p>
    </footer>
  );
}

export default Footer;
