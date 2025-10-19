import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavAdmin from './NavAdmin';
import '/src/App.css';

const AdminModificarProducto = () => {
  const [formData, setFormData] = useState({
    buscarId: '',
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

  const [productoEncontrado, setProductoEncontrado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleBuscar = () => {
    if (!formData.buscarId) {
      alert('Por favor ingrese un ID para buscar');
      return;
    }

    // Simulación de búsqueda de producto
    console.log('Buscando producto con ID:', formData.buscarId);
    
    // Simulamos que encontramos un producto
    const productoSimulado = {
      id: formData.buscarId,
      nombre: 'Camiseta Local 2024',
      descripcion: 'Camiseta oficial de local temporada 2024',
      precio: '45000',
      categoria: 'camisetas',
      estado: 'disponible',
      imagenes: 'imagenes/camiseta-2024-1.jpg, imagenes/camiseta-2024-2.jpg',
      talla: 'M',
      stock: '25'
    };

    setFormData(prevState => ({
      ...prevState,
      ...productoSimulado
    }));
    
    setProductoEncontrado(true);
    alert(`Producto ${formData.buscarId} encontrado`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productoEncontrado) {
      alert('Primero busque un producto para modificar');
      return;
    }
    console.log('Datos del producto modificado:', formData);
    alert('Producto modificado correctamente (simulación)');
  };

  const handleEliminar = () => {
    if (!productoEncontrado) {
      alert('Primero busque un producto para eliminar');
      return;
    }
    
    if (window.confirm(`¿Está seguro de que desea eliminar el producto ${formData.id}?`)) {
      console.log('Producto eliminado:', formData.id);
      alert('Producto eliminado correctamente (simulación)');
      // Resetear formulario
      setFormData({
        buscarId: '',
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
      setProductoEncontrado(false);
    }
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
            <h2>Modificar Producto</h2>
            <p>Complete el formulario para modificar el producto seleccionado.</p>
            
            <form onSubmit={handleSubmit} className="producto-form">
              {/* Búsqueda de producto */}
              <div className="form-group">
                <label htmlFor="buscar-id">Buscar producto por ID:</label>
                <div className="buscar-container">
                  <input 
                    type="text" 
                    id="buscar-id" 
                    name="buscarId" 
                    value={formData.buscarId}
                    onChange={handleChange}
                    placeholder="Ingrese ID del producto"
                  />
                  <button 
                    type="button" 
                    className="btn-buscar"
                    onClick={handleBuscar}
                  >
                    Buscar
                  </button>
                </div>
              </div>
              
              {/* Campos del producto (solo visibles si se encontró) */}
              {productoEncontrado && (
                <div id="campos-producto">
                  <div className="form-group">
                    <label htmlFor="id">ID del Producto:</label>
                    <input 
                      type="text" 
                      id="id" 
                      name="id" 
                      value={formData.id}
                      onChange={handleChange}
                      required 
                      readOnly 
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
                  
                  <div className="form-actions multiple-buttons">
                    <button type="submit" className="btn-submit">
                      Guardar Cambios
                    </button>
                    <button 
                      type="button" 
                      className="btn-delete"
                      onClick={handleEliminar}
                    >
                      Eliminar Producto
                    </button>
                  </div>
                </div>
              )}
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

export default AdminModificarProducto;