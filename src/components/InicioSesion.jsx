import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '/src/App.css'; 

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
    
    
    // Por ahora solo un console.log
    alert('Inicio de sesión enviado (funcionalidad por implementar)');
  };

  return (
    <div className="inicio-sesion">

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

  
    </div>
  );
};

export default InicioSesion;