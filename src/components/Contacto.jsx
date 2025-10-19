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

    </>
  );
};

export default Contacto;