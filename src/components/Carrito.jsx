import { useCarrito } from '../context/CarritoContext';
import { Link } from 'react-router-dom';
import '/src/App.css';

const Carrito = () => {
  const {
    carrito,
    eliminarProducto,
    actualizarCantidad,
    vaciarCarrito,
    cantidadTotal,
    totalPrecio
  } = useCarrito();

  // Formatear precio
  const formatearPrecio = (precio) => {
    return `$${precio.toLocaleString('es-CL')}`;
  };

  // Manejar vaciar carrito con confirmación
  const handleVaciarCarrito = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      vaciarCarrito();
    }
  };

  if (carrito.length === 0) {
    return (
      <div className="carrito">
        <main>
          <div className="carrito-container">
            <div className="carrito-vacio">
              <h2>Tu carrito está vacío</h2>
              <p>Agrega algunos productos increíbles de ColoColeccionables</p>
              <Link to="/productos" className="btn-primary">
                Explorar Productos
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="carrito">
      <main>
        <div className="carrito-container">
          {/* Navegación */}
          <nav className="breadcrumb">
            <Link to="/">Home</Link> &gt; 
            <Link to="/productos">Productos</Link> &gt; 
            <span>Carrito de Compras</span>
          </nav>

          <h1>Carrito de Compras</h1>

          <div className="carrito-content">
            {/* Lista de productos */}
            <div className="carrito-items">
              <div className="carrito-header">
                <h2>Productos ({carrito.length})</h2>
                <button 
                  onClick={handleVaciarCarrito}
                  className="btn-vaciar-carrito"
                >
                  Vaciar Carrito
                </button>
              </div>

              {carrito.map(item => (
                <div key={item.clave} className="carrito-item">
                  <div className="item-imagen">
                    <img src={item.imagen} alt={item.alt} />
                  </div>
                  
                  <div className="item-info">
                    <h3>{item.nombre}</h3>
                    <p className="item-descripcion">{item.descripcion}</p>
                    
                    {item.tallaSeleccionada && (
                      <p className="item-talla">Talla: {item.tallaSeleccionada}</p>
                    )}
                    
                    <p className="item-precio">{item.precioActual}</p>
                  </div>

                  <div className="item-cantidad">
                    <label>Cantidad:</label>
                    <div className="cantidad-controls">
                      <button 
                        type="button"
                        onClick={() => actualizarCantidad(item.clave, item.cantidad - 1)}
                        disabled={item.cantidad <= 1}
                      >
                        -
                      </button>
                      <span>{item.cantidad}</span>
                      <button 
                        type="button"
                        onClick={() => actualizarCantidad(item.clave, item.cantidad + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="item-subtotal">
                    <p className="subtotal">
                      {formatearPrecio(
                        parseInt(item.precioActual?.replace(/[^\d]/g, '') || '0') * item.cantidad
                      )}
                    </p>
                  </div>

                  <div className="item-acciones">
                    <button 
                      type="button"
                      onClick={() => eliminarProducto(item.clave)}
                      className="btn-eliminar"
                      title="Eliminar producto"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen del pedido */}
            <div className="carrito-resumen">
              <div className="resumen-card">
                <h3>Resumen del Pedido</h3>
                
                <div className="resumen-linea">
                  <span>Productos ({cantidadTotal}):</span>
                  <span>{formatearPrecio(totalPrecio)}</span>
                </div>
                
                <div className="resumen-linea">
                  <span>Envío:</span>
                  <span>Gratis</span>
                </div>
                
                <div className="resumen-linea total">
                  <span>Total:</span>
                  <span>{formatearPrecio(totalPrecio)}</span>
                </div>

                <div className="resumen-acciones">
                  <button className="btn-comprar">
                    Proceder al Pago
                  </button>
                  
                  <Link to="/productos" className="btn-seguir-comprando">
                    Seguir Comprando
                  </Link>
                </div>

                <div className="resumen-beneficios">
                  <p>Envío gratis en compras sobre $50.000</p>
                  <p>Devolución gratuita hasta 30 días</p>
                  <p>Pago seguro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Carrito;