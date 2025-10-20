import { Link, useNavigate } from 'react-router-dom';
import '/src/App.css';

const NavAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica para cerrar sesión del administrador
    console.log('Cerrando sesión de administrador');
    alert('Sesión de administrador cerrada');
    navigate('/');
  };

  return (
    <header className="admin-header">
      <div className="admin-header-container">
        {/* Logo */}
        <div className="logo-container">
          <Link to="/admin">
            <span className="admin-badge">Admin</span>
          </Link>
        </div>

        {/* Botón cerrar sesión */}
        <div className="admin-actions">
          <button 
            onClick={handleLogout}
            className="btn-logout"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavAdmin;