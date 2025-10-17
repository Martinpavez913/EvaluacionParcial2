import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import '/src/App.css'; 

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    alert('Mensaje enviado correctamente');
    setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
  };

  return (
    <>
      <main>
        <section className="contacto-section">
          <h2>Contáctanos</h2>
          <p>¿Tienes alguna pregunta? No dudes en contactarnos.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo:</label>
              <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                value={formData.nombre}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Correo electrónico:</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="asunto">Asunto:</label>
              <input 
                type="text" 
                id="asunto" 
                name="asunto" 
                value={formData.asunto}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="mensaje">Mensaje:</label>
              <textarea 
                id="mensaje" 
                name="mensaje" 
                rows="5"
                value={formData.mensaje}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <button type="submit">Enviar Mensaje</button>
            </div>
          </form>
          
          <p className="contacto-alternativo">
            También puedes escribirnos a: <a href="mailto:contacto@colocoleccionables.cl">contacto@colocoleccionables.cl</a>
          </p>
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <img src="/Imagenes/logoconfondo.png" alt="Logo ColoColeccionables" className="logo" />
            <p>La tienda oficial de coleccionables del equipo más popular de Chile</p>
          </div>
          <div className="footer-section">
            <h4>Enlaces rápidos</h4>
            <ul>
              {/* ✅ CAMBIA TAMBIÉN EN EL FOOTER */}
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/productos">Productos</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
              <li><Link to="/admin">Panel de Administrador</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Suscríbete a nuestro boletín</h4>
            <form className="newsletter-form">
              <input type="email" placeholder="Ingresa tu email" />
              <button type="submit">Suscribirse</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 ColoColeccionables. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
};

export default Contacto;