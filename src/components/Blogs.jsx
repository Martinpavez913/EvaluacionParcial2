import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '/src/App.css';

const Blogs = () => {
  const [cartCount, setCartCount] = useState(0);

  // Efecto para cargar el contador del carrito
  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    setCartCount(totalItems);
  }, []);

  // Datos de blogs/noticias
  const blogs = [
    {
      id: 1,
      titulo: "La Historia de la Camiseta Albiceleste",
      extracto: "Descubre la evolución de la camiseta más icónica del fútbol chileno desde sus inicios hasta la actualidad.",
      imagen: "/Imagenes/blog-camiseta-historia.jpg",
      alt: "Evolución camisetas Colo Colo",
      fecha: "15 Enero 2024",
      autor: "Juan Pérez",
      categoria: "Historia",
      tiempoLectura: "5 min lectura"
    },
    {
      id: 2,
      titulo: "Arturo Vidal: El Regreso del Rey",
      extracto: "Análisis del impacto del regreso de Arturo Vidal al club de sus amores y su legado coleccionable.",
      imagen: "/Imagenes/blog-vidal-regreso.jpg",
      alt: "Arturo Vidal en Colo Colo",
      fecha: "12 Enero 2024",
      autor: "María González",
      categoria: "Actualidad",
      tiempoLectura: "4 min lectura"
    },
    {
      id: 3,
      titulo: "Los 10 Objetos Más Buscados por Coleccionistas",
      extracto: "Conoce los artículos más valiosos y codiciados por los coleccionistas del equipo más popular de Chile.",
      imagen: "/Imagenes/blog-objetos-buscados.jpg",
      alt: "Objetos coleccionables Colo Colo",
      fecha: "8 Enero 2024",
      autor: "Carlos López",
      categoria: "Coleccionismo",
      tiempoLectura: "6 min lectura"
    },
    {
      id: 4,
      titulo: "Cómo Conservar Tus Artículos Coleccionables",
      extracto: "Guía completa para mantener en perfecto estado tus camisetas, banderas y objetos del cacique.",
      imagen: "/Imagenes/blog-conservacion.jpg",
      alt: "Conservación de artículos coleccionables",
      fecha: "5 Enero 2024",
      autor: "Ana Silva",
      categoria: "Consejos",
      tiempoLectura: "3 min lectura"
    }
  ];

  return (
    <div className="blogs">
      {/* Main Content */}
      <main>
        <section className="banner">
          <h2>Blog ColoColeccionables</h2>
          <p>Noticias, historias y consejos para los verdaderos coleccionistas del equipo más grande de Chile</p>
        </section>

        <section className="blogs-grid-section">
          <h2>Últimas Noticias</h2>
          <div className="blogs-grid">
            {blogs.map(blog => (
              <article key={blog.id} className="blog-card">
                <div className="blog-imagen">
                  <img src={blog.imagen} alt={blog.alt} />
                  <span className="blog-categoria">{blog.categoria}</span>
                </div>
                <div className="blog-info">
                  <div className="blog-meta">
                    <span className="blog-fecha">{blog.fecha}</span>
                    <span className="blog-tiempo">{blog.tiempoLectura}</span>
                  </div>
                  <h3>{blog.titulo}</h3>
                  <p className="blog-extracto">{blog.extracto}</p>
                  <div className="blog-footer">
                    <span className="blog-autor">Por {blog.autor}</span>
                    <Link to={`/blog/${blog.id}`} className="btn-leer-mas">
                      Leer Más
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="newsletter-section">
          <h2>No Te Pierdas Ninguna Noticia</h2>
          <p>Suscríbete a nuestro newsletter y recibe las últimas actualizaciones directamente en tu email.</p>
          <form onSubmit={(e) => e.preventDefault()} className="newsletter-form">
            <input 
              type="email" 
              placeholder="Ingresa tu correo electrónico" 
              required 
            />
            <button type="submit">Suscribirse</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Blogs;