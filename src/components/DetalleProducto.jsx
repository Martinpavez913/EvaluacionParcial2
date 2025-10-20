import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../hooks/useCarrito';
import '/src/App.css';

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarrito();
  
  const [producto, setProducto] = useState(null);
  const [tallaSeleccionada, setTallaSeleccionada] = useState('');
  const [cantidad, setCantidad] = useState(1);
  
  // Datos de productos (mismo array que en Productos)
  const productos = [
    {
      id: 1,
      nombre: "Camiseta Local 1997",
      descripcion: "Camiseta oficial de local temporada 1997. Edición especial conmemorativa.",
      descripcionLarga: "Esta camiseta conmemora una de las temporadas más gloriosas del Club Social y Deportivo Colo Colo. Fabricada en poliéster de alta calidad, incluye detalles bordados y el escudo oficial de la época. Perfecta para coleccionistas y hinchas que buscan revivir los momentos históricos del equipo más popular de Chile.",
      precioActual: "$89.990",
      precioAnterior: "$109.990",
      imagen: "/Imagenes/camiseta-1997.jpg",
      alt: "Camiseta Local Colo-Colo 1997",
      etiqueta: "Vintage",
      categoria: "vestuario",
      tallasDisponibles: ["S", "M", "L", "XL"],
      stock: 15,
      caracteristicas: ["Material: 100% Poliéster", "Escudo bordado", "Edición limitada", "Incluye certificado de autenticidad"]
    },
    {
      id: 2,
      nombre: "Camiseta Visita 2006",
      descripcion: "Camiseta de visita temporada 2006. Perfecto estado, tallas disponibles.",
      descripcionLarga: "La camiseta de visita de la temporada 2006, caracterizada por su diseño elegante y colores representativos del club. Conservada en perfecto estado, esta pieza es ideal para coleccionistas que buscan completar su arsenal albiceleste.",
      precioActual: "$75.000",
      precioAnterior: "",
      imagen: "/Imagenes/camiseta-2006.jpg",
      alt: "Camiseta Visita Colo-Colo 2006",
      etiqueta: "Clásica",
      categoria: "vestuario",
      tallasDisponibles: ["M", "L", "XL"],
      stock: 8,
      caracteristicas: ["Estado: Excelente", "Tallas limitadas", "Color blanco tradicional", "Diseño oficial"]
    },
    {
      id: 3,
      nombre: "Foto Autografiada Matías Fernández",
      descripcion: "Fotografía oficial autografiada por Matías Fernández. Certificado de autenticidad incluido.",
      descripcionLarga: "Fotografía profesional de Matías Fernández en su etapa en Colo Colo, autografiada personalmente por el jugador. Incluye certificado de autenticidad y marco de protección UV. Una pieza exclusiva para los amantes del fútbol chileno.",
      precioActual: "$120.000",
      precioAnterior: "",
      imagen: "/Imagenes/foto-matias.jpg",
      alt: "Foto autografiada de Matías Fernández",
      etiqueta: "Exclusivo",
      categoria: "accesorios",
      stock: 5,
      caracteristicas: ["Certificado de autenticidad", "Marco protector UV", "Tamaño: 20x25cm", "Edición numerada"]
    },
    {
      id: 4,
      nombre: "Camiseta 2024 Firmada por Vidal",
      descripcion: "Camiseta local temporada 2024 firmada por Arturo Vidal. Solo 50 unidades disponibles.",
      descripcionLarga: "Camiseta oficial de la temporada 2024 firmada personalmente por Arturo Vidal. Esta edición limitada incluye certificado de autenticidad y viene presentada en una caja especial coleccionable. Una pieza única que marca el regreso del 'Rey Arturo' al club de sus amores.",
      precioActual: "$150.000",
      precioAnterior: "$180.000",
      imagen: "/Imagenes/camiseta-vidal.jpg",
      alt: "Camiseta 2024 firmada por Arturo Vidal",
      etiqueta: "Edición Limitada",
      categoria: "vestuario",
      tallasDisponibles: ["Única"],
      stock: 50,
      caracteristicas: ["Firmada por Arturo Vidal", "Edición limitada a 50 unidades", "Caja coleccionable", "Certificado de autenticidad"]
    },
    {
      id: 5,
      nombre: "Libro: Historia de Colo-Colo",
      descripcion: "Edición especial con fotos históricas y relatos de los momentos más importantes del club.",
      descripcionLarga: "Este libro recopila la rica historia del Club Social y Deportivo Colo Colo desde su fundación hasta la actualidad. Con más de 200 fotografías inéditas, entrevistas exclusivas y relatos detallados de los momentos más importantes que han marcado la historia del equipo más popular de Chile.",
      precioActual: "$45.000",
      precioAnterior: "",
      imagen: "/Imagenes/libro-historia.jpg",
      alt: "Libro Historia de Colo-Colo",
      etiqueta: "Coleccionista",
      categoria: "libros",
      stock: 25,
      caracteristicas: ["Tapa dura", "200+ fotografías", "320 páginas", "Edición especial aniversario"]
    },
    {
      id: 6,
      nombre: "Figura Iván Zamorano Edición Especial",
      descripcion: "Figura coleccionable de Iván Zamorano con uniforme de Colo-Colo. Altura: 25cm.",
      descripcionLarga: "Figura coleccionable de alta calidad que representa a Iván 'Bam Bam' Zamorano vistiendo la camiseta de Colo Colo. Fabricada en resina de alta durabilidad con detalles pintados a mano. Incluye base de exhibición con placa identificatoria.",
      precioActual: "$65.000",
      precioAnterior: "",
      imagen: "/Imagenes/figura-zamorano.png",
      alt: "Figura de Iván Zamorano",
      etiqueta: "Nuevo",
      categoria: "figuras",
      stock: 12,
      caracteristicas: ["Altura: 25cm", "Pintura a mano", "Base incluida", "Material: Resina premium"]
    },
    {
      id: 7,
      nombre: "Camiseta Edición Especial 2023",
      descripcion: "Talla L, oficial, firma de jugadores",
      descripcionLarga: "Camiseta edición especial 2023 con firmas del plantel completo. Diseño exclusivo conmemorativo, fabricada en material técnico de alta performance. Ideal para uso diario y colección.",
      precioActual: "$45.000",
      precioAnterior: "$90.000",
      imagen: "/Imagenes/camiseta-especial-2023.jpg",
      alt: "Camiseta Edición Especial 2023",
      etiqueta: "Oferta",
      categoria: "vestuario",
      tallasDisponibles: ["S", "M", "L", "XL"],
      stock: 20,
      caracteristicas: ["Firmas del plantel", "Material técnico", "Oferta especial", "Diseño exclusivo"]
    },
    {
      id: 8,
      nombre: "Bandera Oficial Colo Colo",
      descripcion: "1.5x1m, material resistente",
      descripcionLarga: "Bandera oficial del Club Social y Deportivo Colo Colo. Fabricada en material resistente a la intemperie, ideal para mostrar en el estadio o en tu hogar. Incluye refuerzos en los bordes para mayor durabilidad.",
      precioActual: "$25.000",
      precioAnterior: "$50.000",
      imagen: "/Imagenes/bandera-oficial.jpg",
      alt: "Bandera Oficial Colo Colo",
      etiqueta: "Nuevo",
      categoria: "accesorios",
      stock: 30,
      caracteristicas: ["Tamaño: 1.5x1m", "Resistente al agua", "Colores vivios", "Bordes reforzados"]
    },
    {
      id: 9,
      nombre: "Figura de Arturo Vidal",
      descripcion: "Edición coleccionable, 25cm",
      descripcionLarga: "Figura coleccionable de Arturo Vidal en pose característica. Fabricada con los más altos estándares de calidad, captura todos los detalles del 'Rey Arturo'. Perfecta para exhibir en tu colección de objetos albicelestes.",
      precioActual: "$30.000",
      precioAnterior: "$60.000",
      imagen: "/Imagenes/figura-vidal.jpg",
      alt: "Figura de Arturo Vidal",
      etiqueta: "Coleccionista",
      categoria: "figuras",
      stock: 18,
      caracteristicas: ["Edición coleccionable", "Base incluida", "25cm de altura", "Detalles realistas"]
    },
    {
      id: 10,
      nombre: "Pack Camiseta + Bufanda",
      descripcion: "Combo especial temporada 2023",
      descripcionLarga: "Pack especial que incluye la camiseta oficial de la temporada 2023 más una bufanda oficial del club. Ambos productos son 100% oficiales y representan la pasión por el equipo más grande de Chile.",
      precioActual: "$60.000",
      precioAnterior: "$120.000",
      imagen: "/Imagenes/pack-camiseta-bufanda.jpg",
      alt: "Pack Camiseta + Bufanda",
      etiqueta: "Combo",
      categoria: "vestuario",
      tallasDisponibles: ["S", "M", "L", "XL"],
      stock: 10,
      caracteristicas: ["Camiseta oficial", "Bufanda oficial", "Combo especial", "Ahorro 50%"]
    },
    {
      id: 11,
      nombre: "Taza Oficial Colo Colo",
      descripcion: "Cerámica, diseño exclusivo",
      descripcionLarga: "Taza oficial del Club Social y Deportivo Colo Colo. Fabricada en cerámica de alta calidad con diseño exclusivo que incluye el escudo oficial y los colores representativos del club. Perfecta para empezar el día con la pasión albiceleste.",
      precioActual: "$12.000",
      precioAnterior: "$24.000",
      imagen: "/Imagenes/taza-oficial.jpg",
      alt: "Taza Oficial Colo Colo",
      etiqueta: "Accesorio",
      categoria: "accesorios",
      stock: 40,
      caracteristicas: ["Capacidad: 350ml", "Material: Cerámica", "Diseño exclusivo", "Lavavajillas seguro"]
    }
  ];

  // Efecto para cargar el producto
  useEffect(() => {
    // Buscar el producto por ID
    const productoEncontrado = productos.find(p => p.id === parseInt(id));
    if (productoEncontrado) {
      setProducto(productoEncontrado);
      // Si tiene tallas, seleccionar la primera por defecto
      if (productoEncontrado.tallasDisponibles && productoEncontrado.tallasDisponibles.length > 0) {
        setTallaSeleccionada(productoEncontrado.tallasDisponibles[0]);
      }
    }
  }, [id]);

  // Agregar al carrito (CORREGIDO - usando el hook)
  const handleAgregarAlCarrito = () => {
    if (!producto) return;

    // Validar talla para productos de vestuario
    if (producto.categoria === 'vestuario' && !tallaSeleccionada) {
      alert('Por favor selecciona una talla');
      return;
    }

    // Usar el hook useCarrito en lugar de localStorage directo
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