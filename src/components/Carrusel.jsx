import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '/src/App.css';

const Carrusel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Datos del carrusel - puedes modificar esto según tus necesidades
  const slides = [
    {
      id: 1,
      image: "/Imagenes/banner-camiseta-1997.jpg",
      alt: "Camiseta Edición Especial 1997",
      title: "Camiseta Edición 1997",
      description: "Revive la gloria con nuestra camiseta conmemorativa",
      link: "/productos/1", // Ruta específica del producto
      buttonText: "Ver Producto"
    },
    {
      id: 2,
      image: "/Imagenes/banner-figuras.jpg",
      alt: "Figuras Coleccionables",
      title: "Figuras Exclusivas",
      description: "Colecciona a tus jugadores favoritos",
      link: "/productos?categoria=figuras", // Ruta con filtro
      buttonText: "Ver Figuras"
    },
    {
      id: 3,
      image: "/Imagenes/banner-ofertas.jpg",
      alt: "Ofertas Especiales",
      title: "Ofertas de Temporada",
      description: "Hasta 50% de descuento en productos seleccionados",
      link: "/productos?estado=oferta", // Ruta con filtro
      buttonText: "Ver Ofertas"
    },
    {
      id: 4,
      image: "/Imagenes/banner-novedades.jpg",
      alt: "Nuevos Productos",
      title: "Nuevas Incorporaciones",
      description: "Descubre los últimos lanzamientos",
      link: "/productos?estado=nuevo", // Ruta con filtro
      buttonText: "Ver Novedades"
    }
  ];

  // Auto-avance del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [slides.length]);

  // Navegación manual
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="carrusel">
      <div className="carrusel-container">
        {/* Botones de navegación */}
        <button className="carrusel-btn carrusel-btn-prev" onClick={prevSlide}>
          ‹
        </button>
        
        <button className="carrusel-btn carrusel-btn-next" onClick={nextSlide}>
          ›
        </button>

        {/* Slides */}
        <div className="carrusel-slides">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carrusel-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <div className="slide-image">
                <img src={slide.image} alt={slide.alt} />
              </div>
              
              <div className="slide-content">
                <h2 className="slide-title">{slide.title}</h2>
                <p className="slide-description">{slide.description}</p>
                <Link to={slide.link} className="slide-button">
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Indicadores */}
        <div className="carrusel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`carrusel-indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carrusel;