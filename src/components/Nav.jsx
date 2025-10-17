import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    const [cartCount, setCartCount] = useState(0);

  // Efecto para cargar el contador del carrito
  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    setCartCount(totalItems);
  }, []);
    return (
        <header>
        <div className="logo-container">
          <img src="/Imagenes/logoconfondo.png" alt="Logo ColoColeccionables" className="logo" />  
        </div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </nav>
        <div className="header-right">
          <Link to="/carrito" id="carrito-link">
            Carrito ({cartCount})
          </Link>
          <div className="auth-links">
            <Link to="/inicio-sesion">Iniciar Sesión</Link> | 
            <Link to="/registro">Registrarse</Link>
          </div>
        </div>
      </header>
    )
}

export default Nav;