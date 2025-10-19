import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavAdmin from './NavAdmin';
import '/src/App.css';

const AdminEliminarProducto = () => {
  const [buscarId, setBuscarId] = useState('');
  const [productoEncontrado, setProductoEncontrado] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const handleBuscar = () => {
    if (!buscarId) {
      alert('Por favor ingrese un ID para buscar');
      return;
    }

    // Simulación de búsqueda de producto
    console.log('Buscando producto con ID:', buscarId);
    
    // Simulamos que encontramos un producto
    const productoSimulado = {
      id: buscarId,
      nombre: 'Camiseta Local 2024',
      descripcion: 'Camiseta oficial de local temporada 2024. Material 100% poliéster, escudo bordado.',
      precio: '$45.000',
      categoria: 'camisetas',
      estado: 'disponible',
      imagen: '/Imagenes/camiseta-2024.jpg',
      stock: '25',
      fechaAgregado: '2024-01-15'
    };

    setProductoEncontrado(productoSimulado);
    alert(`Producto ${buscarId} encontrado`);
  };

  const handleEliminar = () => {
    setMostrarConfirmacion(true);
  };

  const confirmarEliminacion = () => {
    if (!productoEncontrado) return;

    console.log('Producto eliminado:', productoEncontrado.id);
    alert(`Producto "${productoEncontrado.nombre}" eliminado correctamente (simulación)`);
    
    // Resetear todo
    setBuscarId('');
    setProductoEncontrado(null);
    setMostrarConfirmacion(false);
  };

  const cancelarEliminacion = () => {
    setMostrarConfirmacion(false);
  };

  const handleNuevaBusqueda = () => {
    setBuscarId('');
    setProductoEncontrado(null);
    setMostrarConfirmacion(false);
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
            <h2>Eliminar Producto</h2>
            <p>Busque un producto por ID para eliminarlo del catálogo.</p>
            
            {/* Búsqueda de producto */}
            <div className="form-group">
              <label htmlFor="buscar-id">Buscar producto por ID:</label>
              <div className="buscar-container">
                <input 
                  type="text" 
                  id="buscar-id" 
                  value={buscarId}
                  onChange={(e) => setBuscarId(e.target.value)}
                  placeholder="Ingrese ID del producto"
                  disabled={productoEncontrado && !mostrarConfirmacion}
                />
                <button 
                  type="button" 
                  className="btn-buscar"
                  onClick={handleBuscar}
                  disabled={productoEncontrado && !mostrarConfirmacion}
                >
                  Buscar
                </button>
              </div>
            </div>
            
            {/* Información del producto encontrado */}
            {productoEncontrado && !mostrarConfirmacion && (
              <div className="producto-info">
                <h3>Producto Encontrado</h3>
                <div className="producto-detalle">
                  <div className="producto-imagen">
                    <img src={productoEncontrado.imagen} alt={productoEncontrado.nombre} />
                  </div>
                  <div className="producto-datos">
                    <p><strong>ID:</strong> {productoEncontrado.id}</p>
                    <p><strong>Nombre:</strong> {productoEncontrado.nombre}</p>
                    <p><strong>Descripción:</strong> {productoEncontrado.descripcion}</p>
                    <p><strong>Precio:</strong> {productoEncontrado.precio}</p>
                    <p><strong>Categoría:</strong> {productoEncontrado.categoria}</p>
                    <p><strong>Estado:</strong> {productoEncontrado.estado}</p>
                    <p><strong>Stock:</strong> {productoEncontrado.stock} unidades</p>
                    <p><strong>Fecha de agregado:</strong> {productoEncontrado.fechaAgregado}</p>
                  </div>
                </div>
                
                <div className="advertencia-eliminar">
                  <h4>Advertencia</h4>
                  <p>Esta acción no se puede deshacer. El producto será eliminado permanentemente del sistema.</p>
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn-delete-confirm"
                    onClick={handleEliminar}
                  >
                    Eliminar Producto
                  </button>
                  <button 
                    type="button" 
                    className="btn-cancel"
                    onClick={handleNuevaBusqueda}
                  >
                    Buscar Otro Producto
                  </button>
                </div>
              </div>
            )}
            
            {/* Confirmación de eliminación */}
            {mostrarConfirmacion && productoEncontrado && (
              <div className="confirmacion-eliminar">
                <h3>¿Está seguro de eliminar este producto?</h3>
                <div className="producto-resumen">
                  <p><strong>{productoEncontrado.nombre}</strong> (ID: {productoEncontrado.id})</p>
                  <p>{productoEncontrado.descripcion}</p>
                </div>
                
                <div className="advertencia-eliminar critica">
                  <h4>ACCIÓN IRREVERSIBLE</h4>
                  <p>Esta acción eliminará permanentemente el producto y toda su información asociada.</p>
                </div>
                
                <div className="form-actions confirmacion-buttons">
                  <button 
                    type="button" 
                    className="btn-delete-final"
                    onClick={confirmarEliminacion}
                  >
                    Sí, Eliminar Permanentemente
                  </button>
                  <button 
                    type="button" 
                    className="btn-cancel"
                    onClick={cancelarEliminacion}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
            
            <div className="back-link">
              <Link to="/admin" className="btn-back">
                Volver al Panel de Administración
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminEliminarProducto;