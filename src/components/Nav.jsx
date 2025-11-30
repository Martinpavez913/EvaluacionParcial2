import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { useSession } from '../hooks/useSession';

const Nav = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const navigate = useNavigate();

    const { cantidadTotal } = useCarrito();

    // ⬅️ USAMOS EL CONTEXT DE SESIÓN
    const { userSession, isLogged, signOut } = useSession();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/productos?search=${encodeURIComponent(searchTerm)}`);
            setSearchTerm('');
            setIsSearchVisible(false);
        }
    };

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    return (
        <header>
            <div className="logo-container">
                <Link to="/">
                    <img src="/Imagenes/logoconfondo.png" alt="Logo" className="logo" />  
                </Link>
            </div>

            <div className="search-container">
                <form onSubmit={handleSearch} className={`search-form ${isSearchVisible ? 'search-visible' : ''}`}>
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">🔍</button>
                </form>
                <button className="search-toggle" onClick={toggleSearch}>🔍</button>
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
                    Carrito ({cantidadTotal})
                </Link>

                {/* 🔥 Si está logueado, mostrar BIENVENIDO y CERRAR SESIÓN */}
                {isLogged ? (
                    <div className="auth-links">
                        <span>Bienvenido, <strong>{userSession.email}</strong></span>
                        <button onClick={signOut} style={{ marginLeft: "10px" }}>
                            Cerrar sesión
                        </button>
                    </div>
                ) : (
                    <div className="auth-links">
                        <Link to="/inicio-sesion">Iniciar Sesión</Link> |
                        <Link to="/registro">Registrarse</Link>
                    </div>
                )}

            </div>
        </header>
    );
};

export default Nav;
