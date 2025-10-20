import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '/src/App.css';

const Carrusel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Datos del carrusel
  const slides = [
    {
      id: 1,
      image: "/Imagenes/fotocarrusel1.jpg",
      alt: "Camiseta Edición Especial 1997",
      title: "Productos de colección",
      description: "Revisa todos nuestros productos disponibles",
      link: "/productos/", // Ruta específica del producto
      buttonText: "Ver Productos"
    },
    {
      id: 2,
      image: "/Imagenes/fotocarrusel2.png",
      alt: "Figuras Coleccionables",
      title: "Figuras Exclusivas",
      description: "Colecciona a tus jugadores favoritos",
      link: "/productos?categoria=figuras", // Ruta con filtro
      buttonText: "Ver Figuras"
    },
    {
      id: 3,
      image: "/Imagenes/fotocarrusel3.jpg",
      alt: "Ofertas Especiales",
      title: "Nuestro equipo, nuestra historia",
      description: "Informate con noticias y articulos de nuestro Blog",
      link: "/blogs", // Ruta con filtro
      buttonText: "Ver Blog"
    },
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