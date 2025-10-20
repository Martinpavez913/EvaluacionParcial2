import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '/src/App.css';

const Registro = () => {
  const [formData, setFormData] = useState({
    run: '',
    nombres: '',
    apellidos: '',
    email: '',
    fechaNacimiento: '',
    region: '',
    comuna: '',
    direccion: '',
    password: '',
    confirmPassword: ''
  });

  const [regiones] = useState([
    { id: 'rm', nombre: 'Región Metropolitana' },
    { id: 'v', nombre: 'Valparaíso' },
    { id: 'viii', nombre: 'Biobío' },
    // Aquí puedes agregar más regiones
  ]);

  const [comunas] = useState([
    { id: 'santiago', nombre: 'Santiago', regionId: 'rm' },
    { id: 'providencia', nombre: 'Providencia', regionId: 'rm' },
    { id: 'las-condes', nombre: 'Las Condes', regionId: 'rm' },
    { id: 'valparaiso', nombre: 'Valparaíso', regionId: 'v' },
    { id: 'viña-del-mar', nombre: 'Viña del Mar', regionId: 'v' },
    { id: 'concepcion', nombre: 'Concepción', regionId: 'viii' },
    { id: 'talcahuano', nombre: 'Talcahuano', regionId: 'viii' },
    // Aquí puedes agregar más comunas
  ]);

  const [comunasFiltradas, setComunasFiltradas] = useState([]);

  useEffect(() => {
    if (formData.region) {
      const comunasDeRegion = comunas.filter(comuna => comuna.regionId === formData.region);
      setComunasFiltradas(comunasDeRegion);
      
      if (formData.comuna && !comunasDeRegion.find(c => c.id === formData.comuna)) {
        setFormData(prev => ({ ...prev, comuna: '' }));
      }
    } else {
      setComunasFiltradas([]);
      setFormData(prev => ({ ...prev, comuna: '' }));
    }
  }, [formData.region, comunas]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validarRUN = (run) => /^[0-9]{7,8}-[0-9kK]{1}$/.test(run);
  const validarPassword = (password) => password.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validarRUN(formData.run)) {
      alert('Por favor ingrese un RUN válido (formato: 12345678-9)');
      return;
    }

    if (!validarPassword(formData.password)) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!formData.region || !formData.comuna) {
      alert('Por favor seleccione región y comuna');
      return;
    }

    console.log('Datos del formulario:', formData);
    alert('¡Registro exitoso! (funcionalidad por implementar)');
    
    setFormData({
      run: '', nombres: '', apellidos: '', email: '', fechaNacimiento: '',
      region: '', comuna: '', direccion: '', password: '', confirmPassword: ''
    });
  };

  return (
    <div className="registro">
      <main>
        <section className="registro-section">
          <h2>Crear Cuenta</h2>
          <p>Regístrate para acceder a beneficios exclusivos y realizar compras en nuestra tienda.</p>
          
          <form id="registroForm" onSubmit={handleSubmit}>
            {/* --- INICIO DE CAMPOS DEL FORMULARIO --- */}
            
            <div className="form-group">
              <label htmlFor="run">RUN:</label>
              <input 
                type="text" id="run" name="run" value={formData.run}
                onChange={handleInputChange} placeholder="12345678-9" required 
                pattern="[0-9]{7,8}-[0-9kK]{1}" title="Formato: 12345678-9"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento (opcional):</label>
              <input 
                type="date" id="fechaNacimiento" name="fechaNacimiento"
                value={formData.fechaNacimiento} onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="nombres">Nombres:</label>
              <input 
                type="text" id="nombres" name="nombres" value={formData.nombres}
                onChange={handleInputChange} required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="apellidos">Apellidos:</label>
              <input 
                type="text" id="apellidos" name="apellidos" value={formData.apellidos}
                onChange={handleInputChange} required 
              />
            </div>

            {/* Este campo ocupará todo el ancho disponible */}
            <div className="form-group full-width">
              <label htmlFor="email">Correo electrónico:</label>
              <input 
                type="email" id="email" name="email" value={formData.email}
                onChange={handleInputChange} required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="region">Región:</label>
              <select id="region" name="region" value={formData.region} onChange={handleInputChange} required>
                <option value="">Seleccione una región</option>
                {regiones.map(region => (
                  <option key={region.id} value={region.id}>{region.nombre}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="comuna">Comuna:</label>
              <select id="comuna" name="comuna" value={formData.comuna} onChange={handleInputChange} required disabled={!formData.region}>
                <option value="">Seleccione una comuna</option>
                {comunasFiltradas.map(comuna => (
                  <option key={comuna.id} value={comuna.id}>{comuna.nombre}</option>
                ))}
              </select>
            </div>
            
            {/* Este campo también ocupará todo el ancho */}
            <div className="form-group full-width">
              <label htmlFor="direccion">Dirección:</label>
              <input 
                type="text" id="direccion" name="direccion" value={formData.direccion}
                onChange={handleInputChange} required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input 
                type="password" id="password" name="password" value={formData.password}
                onChange={handleInputChange} required minLength="6"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
              <input 
                type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword}
                onChange={handleInputChange} required minLength="6"
              />
            </div>
            
            {/* El botón de envío ocupará todo el ancho */}
            <div className="form-group full-width">
              <button type="submit">Registrarse</button>
            </div>

            {/* --- FIN DE CAMPOS DEL FORMULARIO --- */}
          </form>
          
          <div className="registro-links">
            <p>¿Ya tienes una cuenta? <Link to="/inicio-sesion">Inicia sesión aquí</Link></p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Registro;