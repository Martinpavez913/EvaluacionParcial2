import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import '/src/App.css';
import { obtenerProductos } from '../services/productos';

const Productos = () => {
  const { agregarAlCarrito, cantidadTotal } = useCarrito();
  const [filters, setFilters] = useState({
    categoria: '',
    precio: '',
    estado: ''
  });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productos, setProductos] = useState([]);
  const location = useLocation();

  useEffect(() =>{
    obtenerProductos()
    .then(data=>{
      setProductos(data)
      aplicarFiltrosYBusqueda()
    })
  },[])

  const aplicarFiltrosYBusqueda = () => {
    let resultados = productos;

    const urlParams = new URLSearchParams(location.search);
    const searchQuery = urlParams.get('search');
    
    if (searchQuery) {
      resultados = resultados.filter(producto => 
        producto.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) ||
        producto.etiqueta.toLowerCase().includes(searchQuery.toLowerCase()) ||
        producto.categoria.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.categoria) {
      resultados = resultados.filter(producto => producto.categoria === filters.categoria);
    }

    if (filters.precio) {
      resultados = resultados.filter(producto => {
        const precioNum = parseInt(producto.precioActual.replace(/[^\d]/g, ''));
        switch (filters.precio) {
          case '0-20000': return precioNum <= 20000;
          case '20000-50000': return precioNum > 20000 && precioNum <= 50000;
          case '50000-100000': return precioNum > 50000 && precioNum <= 100000;
          case '100000+': return precioNum > 100000;
          default: return true;
        }
      });
    }

    if (filters.estado) {
      const estadoMap = { 'nuevo': 'Nuevo', 'usado': 'Vintage', 'vintage': 'Vintage' };
      resultados = resultados.filter(producto => producto.etiqueta === estadoMap[filters.estado]);
    }

    setFilteredProducts(resultados);
  };

  useEffect(() => { aplicarFiltrosYBusqueda(); }, [location.search, filters]);

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters(prev => ({ ...prev, [id]: value }));
  };

  const limpiarFiltros = () => setFilters({ categoria: '', precio: '', estado: '' });

  const handleAgregarAlCarrito = (producto) => {
    agregarAlCarrito(producto);
    alert(`${producto.nombre} agregado al carrito`);
  };

  const getSearchTerm = () => new URLSearchParams(location.search).get('search') || '';

  return (
    <div className="productos">
      <main>
        <section className="filtros">
          <h2>Filtrar Productos</h2>
          {getSearchTerm() && (
            <div className="search-indicator">
              <p>Buscando: "<strong>{getSearchTerm()}</strong>"</p>
              <Link 
                to="/productos" 
                className="btn-limpiar-busqueda"
                onClick={() => {
                  window.history.replaceState({}, '', '/productos');
                  aplicarFiltrosYBusqueda();
                }}
              >
                Limpiar búsqueda
              </Link>
            </div>
          )}
          <div className="filtros-container">
            <div className="filtro-grupo">
              <label htmlFor="categoria">Categoría:</label>
              <select id="categoria" value={filters.categoria} onChange={handleFilterChange}>
                <option value="">Todas las categorías</option>
                <option value="vestuario">Vestuario</option>
                <option value="accesorios">Accesorios</option>
                <option value="libros">Libros</option>
                <option value="figuras">Figuras</option>
              </select>
            </div>
            <div className="filtro-grupo">
              <label htmlFor="precio">Rango de precio:</label>
              <select id="precio" value={filters.precio} onChange={handleFilterChange}>
                <option value="">Todos los precios</option>
                <option value="0-20000">$0 - $20.000</option>
                <option value="20000-50000">$20.000 - $50.000</option>
                <option value="50000-100000">$50.000 - $100.000</option>
                <option value="100000+">Más de $100.000</option>
              </select>
            </div>
            <div className="filtro-grupo">
              <label htmlFor="estado">Estado:</label>
              <select id="estado" value={filters.estado} onChange={handleFilterChange}>
                <option value="">Todos</option>
                <option value="nuevo">Nuevo</option>
                <option value="usado">Usado</option>
                <option value="vintage">Vintage/Retro</option>
              </select>
            </div>
            <div className="filtro-grupo">
              <button type="button" className="btn-limpiar" onClick={limpiarFiltros}>
                Limpiar Filtros
              </button>
            </div>
          </div>
        </section>

        <section className="catalogo">
          <h2>{getSearchTerm() ? `Resultados de búsqueda para "${getSearchTerm()}"` : 'Productos Destacados'}</h2>
          {filteredProducts.length === 0 && (
            <div className="sin-productos">
              <p>{getSearchTerm() ? `No se encontraron productos para "${getSearchTerm()}"` : 'No hay productos que coincidan con los filtros seleccionados'}</p>
              <button className="btn-limpiar" onClick={limpiarFiltros}>Ver todos los productos</button>
            </div>
          )}
          <div className="productos-grid">
            {filteredProducts.map(producto => (
              <article key={producto.id} className="producto">
                <div className="producto-imagen">
                  <img src={producto.imagen} alt={producto.alt} />
                  <span className="producto-etiqueta">{producto.etiqueta}</span>
                </div>
                <div className="producto-info">
                  <h3>{producto.nombre}</h3>
                  <p>{producto.descripcion}</p>
                  <div className="producto-precio">
                    <span className="precio-actual">{producto.precioActual}</span>
                    {producto.precioAnterior && <span className="precio-anterior">{producto.precioAnterior}</span>}
                  </div>
                  <Link to={`/detalle-producto/${producto.id}`} className="btn-ver-detalles">Ver Detalles</Link>
                  <button className="btn-agregar-carrito" onClick={() => handleAgregarAlCarrito(producto)}>Agregar al Carrito</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Productos;
