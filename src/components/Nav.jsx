import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';

const Nav = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const navigate = useNavigate();
    
    // ✅ Usar el hook useCarrito en lugar de localStorage directo
    const { cantidadTotal } = useCarrito();

    // Función para manejar la búsqueda
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            // Navegar a la página de productos con el término de búsqueda
            navigate(`/productos?search=${encodeURIComponent(searchTerm)}`);
            setSearchTerm('');
            setIsSearchVisible(false);
        }
    };

    // Función para toggle de la barra de búsqueda en móvil
    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    return (
        <header>
            <div className="logo-container">
                <Link to="/">
                    <img src="/Imagenes/logoconfondo.png" alt="Logo ColoColeccionables" className="logo" />  
                </Link>
            </div>

            {/* Barra de búsqueda */}
            <div className="search-container">
                <form onSubmit={handleSearch} className={`search-form ${isSearchVisible ? 'search-visible' : ''}`}>
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">
                        🔍
                    </button>
                </form>
                <button 
                    className="search-toggle"
                    onClick={toggleSearch}
                    aria-label="Toggle search"
                >
                    🔍
                </button>
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
                {/* ✅ Usar cantidadTotal del hook en lugar de cartCount */}
                <Link to="/carrito" id="carrito-link">
                    Carrito ({cantidadTotal})
                </Link>
                <div className="auth-links">
                    <Link to="/inicio-sesion">Iniciar Sesión</Link> |
                    <Link to="/registro">Registrarse</Link>
                </div>
            </div>
        </header>
    );
};

export default Nav;