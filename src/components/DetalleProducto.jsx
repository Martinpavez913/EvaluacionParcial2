import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import '/src/App.css';
import { obtenerProducto, obtenerProductos } from '../services/productos';

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarrito();
  
  const [producto, setProducto] = useState(null);
  const [tallaSeleccionada, setTallaSeleccionada] = useState('');
  const [cantidad, setCantidad] = useState(1);

  const [productos, setProductos] = useState([]);

  useEffect(() =>{
    obtenerProductos()
    .then(data=>{
      setProductos(data)
      
    })
  },[])
  
  

  // Efecto para cargar el producto
  useEffect(() => {
    // Buscar el producto por ID
     obtenerProducto(id)
    .then(productoEncontrado => {
      if (productoEncontrado) {
      setProducto(productoEncontrado);
      // Si tiene tallas, seleccionar la primera por defecto
      if (productoEncontrado.tallasDisponibles && productoEncontrado.tallasDisponibles.length > 0) {
        setTallaSeleccionada(productoEncontrado.tallasDisponibles[0]);
      }
    }
    })
  
  }, [id]);

  // Agregar al carrito
  const handleAgregarAlCarrito = () => {
    if (!producto) return;

    // Validar talla para productos de vestuario
    if (producto.categoria === 'vestuario' && !tallaSeleccionada) {
      alert('Por favor selecciona una talla');
      return;
    }

    // Usar el context useCarrito en lugar de localStorage directo
    agregarAlCarrito(producto, tallaSeleccionada, cantidad);
    
    alert(`${producto.nombre} ${tallaSeleccionada ? `(Talla ${tallaSeleccionada})` : ''} agregado al carrito`);
  };

  // Comprar ahora
  const comprarAhora = () => {
    handleAgregarAlCarrito();
    navigate('/carrito'); // Redirigir al carrito
  };

  if (!producto) {
    return (
      <div className="detalle-producto">
        <div className="producto-no-encontrado">
          <h2>Producto no encontrado</h2>
          <p>El producto que buscas no existe o ha sido removido.</p>
          <Link to="/productos" className="btn-primary">Volver al Catálogo</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="detalle-producto">
      <main>
        <div className="detalle-container">
          {/* Navegación */}
          <nav className="breadcrumb">
            <Link to="/">Home</Link> &gt; 
            <Link to="/productos">Productos</Link> &gt; 
            <span>{producto.nombre}</span>
          </nav>

          <div className="detalle-content">
            {/* Imagen del producto */}
            <div className="detalle-imagen">
              <img src={producto.imagen} alt={producto.alt} />
              <span className="producto-etiqueta">{producto.etiqueta}</span>
            </div>

            {/* Información del producto */}
            <div className="detalle-info">
              <h1>{producto.nombre}</h1>
              <p className="detalle-descripcion-corta">{producto.descripcion}</p>

              {/* Precio */}
              <div className="detalle-precio">
                <span className="precio-actual">{producto.precioActual}</span>
                {producto.precioAnterior && (
                  <span className="precio-anterior">{producto.precioAnterior}</span>
                )}
              </div>

              {/* Selector de talla (solo para vestuario) */}
              {producto.tallasDisponibles && producto.tallasDisponibles.length > 0 && (
                <div className="talla-selector">
                  <label>Talla:</label>
                  <div className="tallas-options">
                    {producto.tallasDisponibles.map(talla => (
                      <button
                        key={talla}
                        type="button"
                        className={`talla-option ${tallaSeleccionada === talla ? 'selected' : ''}`}
                        onClick={() => setTallaSeleccionada(talla)}
                      >
                        {talla}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Selector de cantidad */}
              <div className="cantidad-selector">
                <label>Cantidad:</label>
                <div className="cantidad-controls">
                  <button 
                    type="button"
                    onClick={() => setCantidad(prev => Math.max(1, prev - 1))}
                    disabled={cantidad <= 1}
                  >
                    -
                  </button>
                  <span>{cantidad}</span>
                  <button 
                    type="button"
                    onClick={() => setCantidad(prev => prev + 1)}
                    disabled={cantidad >= producto.stock}
                  >
                    +
                  </button>
                </div>
                <span className="stock-info">Stock disponible: {producto.stock}</span>
              </div>

              {/* Botones de acción */}
              <div className="detalle-actions">
                <button 
                  className="btn-agregar-carrito"
                  onClick={handleAgregarAlCarrito}
                >
                  Agregar al Carrito
                </button>
                <button 
                  className="btn-comprar-ahora"
                  onClick={comprarAhora}
                >
                  Comprar Ahora
                </button>
              </div>

              {/* Características */}
              <div className="detalle-caracteristicas">
                <h3>Características</h3>
                <ul>
                  {producto.caracteristicas.map((caracteristica, index) => (
                    <li key={index}>{caracteristica}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Descripción extendida */}
          <div className="detalle-descripcion-extendida">
            <h3>Descripción del Producto</h3>
            <p>{producto.descripcionLarga}</p>
          </div>

          {/* Productos relacionados */}
          <div className="productos-relacionados">
            <h3>Productos Relacionados</h3>
            <div className="relacionados-grid">
              {productos
                .filter(p => p.categoria === producto.categoria && p.id !== producto.id)
                .slice(0, 3)
                .map(relacionado => (
                  <Link 
                    key={relacionado.id} 
                    to={`/detalle-producto/${relacionado.id}`}
                    className="producto-relacionado"
                  >
                    <img src={relacionado.imagen} alt={relacionado.alt} />
                    <h4>{relacionado.nombre}</h4>
                    <span className="precio-relacionado">{relacionado.precioActual}</span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetalleProducto;