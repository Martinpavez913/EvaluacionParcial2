import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div>
        <img src="/Imagenes/logoconfondo.png" alt="Logo ColoColeccionables" className="logo" /> 
        <p>La tienda oficial de coleccionables del equipo más popular de Chile</p>
      </div>
      <div>
        <h4>Enlaces rápidos</h4>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/nosotros">Nosotros</Link></li>
          <li><Link to="/blogs">Blogs</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          <li><Link to="/admin">Panel de Administrador</Link></li>
        </ul>
      </div>
      <div>
        <h4>Suscríbete a nuestro boletín</h4>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Ingresa tu email" />
          <button type="submit">Suscribirse</button>
        </form>
      </div>
      <div>
        <p>&copy; 2025 ColoColeccionables. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;