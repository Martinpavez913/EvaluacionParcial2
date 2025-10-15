import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '/src/App.css'; // Según tu nueva ruta

const InicioSesion = () => {
  const [cartCount, setCartCount] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Efecto para cargar el contador del carrito
  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    setCartCount(totalItems);
  }, []);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    
    // Aquí irá la lógica de autenticación
    // Por ahora solo un console.log
    alert('Inicio de sesión enviado (funcionalidad por implementar)');
  };

  return (
    <div className="inicio-sesion">
      {/* Header */}
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
        <div>
          <Link to="/carrito">Carrito ({cartCount})</Link>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <section className="login-section">
          <h2>Iniciar Sesión</h2>
          <p>Ingresa a tu cuenta para acceder a beneficios exclusivos y realizar compras en nuestra tienda.</p>
          
          <form id="loginForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico:</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={formData.password}
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <button type="submit">Iniciar Sesión</button>
            </div>
          </form>
          
          <div className="login-links">
            <p>¿Olvidaste tu contraseña? <Link to="/recuperar-password">Recupérala aquí</Link></p>
            <p>¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link></p>
          </div>
        </section>
      </main>

      {/* Footer */}
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
    </div>
  );
};

export default InicioSesion;