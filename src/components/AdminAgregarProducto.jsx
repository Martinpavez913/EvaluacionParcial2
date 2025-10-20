import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavAdmin from './NavAdmin';
import '/src/App.css';

const AdminAgregarProducto = () => {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    estado: '',
    imagenes: '',
    talla: '',
    stock: ''
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
    console.log('Datos del producto:', formData);
    alert('Producto agregado correctamente (simulación)');
    
  };

  return (
    <div className="admin-layout">
      {/* Header de administración */}
      <NavAdmin />
      
      <div className="admin-container">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <h3>Panel de Administración</h3>
          <ul>
            <li>
              <Link to="/admin">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/productos">Gestión de Productos</Link>
            </li>
            <li>
              <Link to="/admin/usuarios">Gestión de Usuarios</Link>
            </li>
            <li>
              <Link to="/admin/pedidos">Pedidos</Link>
            </li>
            <li>
              <Link to="/admin/estadisticas">Estadísticas</Link>
            </li>
            <li>
              <Link to="/admin/configuracion">Configuración</Link>
            </li>
          </ul>
        </aside>

        {/* Contenido principal */}
        <main className="admin-main">
          <section className="admin-form-section">
            <h2>Añadir Nuevo Producto</h2>
            <p>Complete el formulario para agregar un nuevo producto al catálogo.</p>
            
            <form onSubmit={handleSubmit} className="producto-form">
              <div className="form-group">
                <label htmlFor="id">ID del Producto:</label>
                <input 
                  type="text" 
                  id="id" 
                  name="id" 
                  value={formData.id}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="nombre">Nombre del Producto:</label>
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
                <label htmlFor="descripcion">Descripción:</label>
                <textarea 
                  id="descripcion" 
                  name="descripcion" 
                  rows="4" 
                  value={formData.descripcion}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="precio">Precio ($):</label>
                <input 
                  type="number" 
                  id="precio" 
                  name="precio" 
                  min="0" 
                  step="0.01" 
                  value={formData.precio}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="categoria">Categoría:</label>
                <select 
                  id="categoria" 
                  name="categoria" 
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  <option value="figuras">Figuras de Acción</option>
                  <option value="camisetas">Camisetas</option>
                  <option value="accesorios">Accesorios</option>
                  <option value="coleccionables">Coleccionables</option>
                  <option value="otros">Otros</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="estado">Estado:</label>
                <select 
                  id="estado" 
                  name="estado" 
                  value={formData.estado}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un estado</option>
                  <option value="disponible">Disponible</option>
                  <option value="agotado">Agotado</option>
                  <option value="pronto-lanzamiento">Próximo Lanzamiento</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="imagenes">Imágenes (URLs separadas por coma):</label>
                <textarea 
                  id="imagenes" 
                  name="imagenes" 
                  rows="3" 
                  value={formData.imagenes}
                  onChange={handleChange}
                  placeholder="imagenes/figura-zamorano.jpg, imagenes/figura-zamorano-2.jpg" 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="talla">Talla (si aplica):</label>
                <select 
                  id="talla" 
                  name="talla" 
                  value={formData.talla}
                  onChange={handleChange}
                >
                  <option value="">No aplica</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                  <option value="Única">Única</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="stock">Stock disponible:</label>
                <input 
                  type="number" 
                  id="stock" 
                  name="stock" 
                  min="0" 
                  value={formData.stock}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Añadir Producto
                </button>
              </div>
            </form>
            
            <div className="back-link">
              <Link to="/admin" className="btn-back">
                ← Volver al Panel de Administración
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminAgregarProducto;