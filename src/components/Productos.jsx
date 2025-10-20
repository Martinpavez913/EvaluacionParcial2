import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import '/src/App.css';

const Productos = () => {
  const { agregarAlCarrito, cantidadTotal } = useCarrito();
  const [filters, setFilters] = useState({
    categoria: '',
    precio: '',
    estado: ''
  });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();

  // Datos de productos
  const productos = [
    {
      id: 1,
      nombre: "Camiseta Local 1997",
      descripcion: "Camiseta oficial de local temporada 1997. Edición especial conmemorativa.",
      precioActual: "$89.990",
      precioAnterior: "$109.990",
      imagen: "/Imagenes/camiseta-1997.jpg",
      alt: "Camiseta Local Colo-Colo 1997",
      etiqueta: "Vintage",
      categoria: "vestuario"
    },
    {
      id: 2,
      nombre: "Camiseta Visita 2006",
      descripcion: "Camiseta de visita temporada 2006. Perfecto estado, tallas disponibles.",
      precioActual: "$75.000",
      precioAnterior: "",
      imagen: "/Imagenes/camiseta-2006.jpg",
      alt: "Camiseta Visita Colo-Colo 2006",
      etiqueta: "Clásica",
      categoria: "vestuario"
    },
    {
      id: 3,
      nombre: "Foto Autografiada Matías Fernández",
      descripcion: "Fotografía oficial autografiada por Matías Fernández. Certificado de autenticidad incluido.",
      precioActual: "$120.000",
      precioAnterior: "",
      imagen: "/Imagenes/foto-matias.jpg",
      alt: "Foto autografiada de Matías Fernández",
      etiqueta: "Exclusivo",
      categoria: "accesorios"
    },
    {
      id: 4,
      nombre: "Camiseta 2024 Firmada por Vidal",
      descripcion: "Camiseta local temporada 2024 firmada por Arturo Vidal. Solo 50 unidades disponibles.",
      precioActual: "$150.000",
      precioAnterior: "$180.000",
      imagen: "/Imagenes/camiseta-vidal.jpg",
      alt: "Camiseta 2024 firmada por Arturo Vidal",
      etiqueta: "Edición Limitada",
      categoria: "vestuario"
    },
    {
      id: 5,
      nombre: "Libro: Historia de Colo-Colo",
      descripcion: "Edición especial con fotos históricas y relatos de los momentos más importantes del club.",
      precioActual: "$45.000",
      precioAnterior: "",
      imagen: "/Imagenes/libro-historia.jpg",
      alt: "Libro Historia de Colo-Colo",
      etiqueta: "Coleccionista",
      categoria: "libros"
    },
    {
      id: 6,
      nombre: "Figura Iván Zamorano Edición Especial",
      descripcion: "Figura coleccionable de Iván Zamorano con uniforme de Colo-Colo. Altura: 25cm.",
      precioActual: "$65.000",
      precioAnterior: "",
      imagen: "/Imagenes/figura-zamorano.png",
      alt: "Figura de Iván Zamorano",
      etiqueta: "Nuevo",
      categoria: "figuras"
    },
    {
      id: 7,
      nombre: "Camiseta Edición Especial 2023",
      descripcion: "Talla L, oficial, firma de jugadores",
      precioActual: "$45.000",
      precioAnterior: "$90.000",
      imagen: "/Imagenes/camiseta-especial-2023.jpg",
      alt: "Camiseta Edición Especial 2023",
      etiqueta: "Oferta",
      categoria: "vestuario"
    },
    {
      id: 8,
      nombre: "Bandera Oficial Colo Colo",
      descripcion: "1.5x1m, material resistente",
      precioActual: "$25.000",
      precioAnterior: "$50.000",
      imagen: "/Imagenes/bandera-oficial.jpg",
      alt: "Bandera Oficial Colo Colo",
      etiqueta: "Nuevo",
      categoria: "accesorios"
    },
    {
      id: 9,
      nombre: "Figura de Arturo Vidal",
      descripcion: "Edición coleccionable, 25cm",
      precioActual: "$30.000",
      precioAnterior: "$60.000",
      imagen: "/Imagenes/figura-vidal.jpg",
      alt: "Figura de Arturo Vidal",
      etiqueta: "Coleccionista",
      categoria: "figuras"
    },
    {
      id: 10,
      nombre: "Pack Camiseta + Bufanda",
      descripcion: "Combo especial temporada 2023",
      precioActual: "$60.000",
      precioAnterior: "$120.000",
      imagen: "/Imagenes/pack-camiseta-bufanda.jpg",
      alt: "Pack Camiseta + Bufanda",
      etiqueta: "Combo",
      categoria: "vestuario"
    },
    {
      id: 11,
      nombre: "Taza Oficial Colo Colo",
      descripcion: "Cerámica, diseño exclusivo",
      precioActual: "$12.000",
      precioAnterior: "$24.000",
      imagen: "/Imagenes/taza-oficial.jpg",
      alt: "Taza Oficial Colo Colo",
      etiqueta: "Accesorio",
      categoria: "accesorios"
    }
  ];

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
