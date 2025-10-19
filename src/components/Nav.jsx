import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Efecto para cargar el contador del carrito
  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    setCartCount(totalItems);
  }, []);

  // Función para alternar el menú móvil
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Función para cerrar el menú al hacer clic en un link
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Función para verificar si la ruta está activa
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header>
      <div className="logo-container">
        <Link to="/">
          <img src="/Imagenes/logoconfondo.png" alt="Logo ColoColeccionables" className="logo" />  
        </Link>
      </div>

      {/* Navbar con clase condicional para móvil */}
      <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
        <ul>
          <li>
            <Link 
              to="/" 
              className={isActive('/') ? 'active' : ''}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/productos" 
              className={isActive('/productos') ? 'active' : ''}
              onClick={closeMenu}
            >
              Productos
            </Link>
          </li>
          <li>
            <Link 
              to="/nosotros" 
              className={isActive('/nosotros') ? 'active' : ''}
              onClick={closeMenu}
            >
              Nosotros
            </Link>
          </li>
          <li>
            <Link 
              to="/blogs" 
              className={isActive('/blogs') ? 'active' : ''}
              onClick={closeMenu}
            >
              Blogs
            </Link>
          </li>
          <li>
            <Link 
              to="/contacto" 
              className={isActive('/contacto') ? 'active' : ''}
              onClick={closeMenu}
            >
              Contacto
            </Link>
          </li>
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

        {/* Botón menú móvil */}
        <button 
          className={`menu-toggle ${isMenuOpen ? 'menu-open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Nav;