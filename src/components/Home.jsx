import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '/src/App.css';

const Home = () => {
  

  // Función para añadir al carrito
  const handleAddToCart = (product) => {
    // Aquí irá la lógica para añadir productos al carrito
    console.log('Añadir al carrito:', product);
    // Actualizar el contador
    setCartCount(prev => prev + 1);
  };

  // Datos de productos destacados
  const featuredProducts = [
    {
      id: 1,
      name: "Camiseta Edición Especial 2023",
      description: "Talla L, oficial, firma de jugadores",
      currentPrice: "$45.000",
      oldPrice: "$90.000",
      image: "/Imagenes/camiseta-especial-2023.jpg",
      alt: "Camiseta Edición Especial 2023"
    },
    {
      id: 2,
      name: "Bandera Oficial",
      description: "1.5x1m, material resistente",
      currentPrice: "$25.000",
      oldPrice: "$50.000",
      image: "/Imagenes/bandera-oficial.jpg",
      alt: "Bandera Oficial Colo Colo"
    },
    {
      id: 3,
      name: "Figura de Arturo Vidal",
      description: "Edición coleccionable, 25cm",
      currentPrice: "$30.000",
      oldPrice: "$60.000",
      image: "/Imagenes/figuraarturovidal.jpeg",
      alt: "Figura de Arturo Vidal"
    }
  ];

  // Datos de ofertas especiales
  const specialOffers = [
    {
      id: 4,
      name: "Pack Camiseta + Bufanda",
      description: "Combo especial temporada 2023",
      currentPrice: "$60.000",
      oldPrice: "$120.000",
      image: "/Imagenes/pack-camiseta-bufanda.jpg",
      alt: "Pack Camiseta + Bufanda"
    },
    {
      id: 5,
      name: "Taza Oficial",
      description: "Cerámica, diseño exclusivo",
      currentPrice: "$12.000",
      oldPrice: "$24.000",
      image: "/Imagenes/taza-oficial.jpg",
      alt: "Taza Oficial Colo Colo"
    }
  ];

  // Componente de tarjeta de producto reutilizable
  const ProductCard = ({ product }) => (
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.alt} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">
          <span className="current-price">{product.currentPrice}</span>
          <span className="old-price">{product.oldPrice}</span>
        </p>
        <button 
          className="btn-add-cart"
          onClick={() => handleAddToCart(product)}
        >
          Añadir al carrito
        </button>
      </div>
    </article>
  );

  return (
    <div className="home">
      {/* Main Content */}
      <main>
        <section className="banner">
          <h2>ColoColeccionables</h2>
          <p>La mejor tienda de objetos coleccionables del equipo más grande de Chile. Encuentra camisetas históricas, banderas, escudos y mucho más.</p>
          <Link to="/productos" className="btn-primary">Ver productos</Link>
        </section>

        <section className="featured-products">
          <h2>Productos Destacados</h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="special-offers">
          <h2>Ofertas Especiales</h2>
          <div className="products-grid">
            {specialOffers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div>
          <img src="/Imagenes/logoconfondo.png" alt="Logo ColoColeccionables" className="logo" /> 
          <p>La tienda oficial de coleccionables del equipo más popular de Chile</p>
        </div>
        <div>
          <h4>Enlaces rápidos</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/admin">Panel de Administrador</Link></li>
          </ul>
        </div>
        <div>
          <h4>Suscríbete a nuestro boletín</h4>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Ingresa tu email" />
            <button type="submit">Suscribirse</button>
          </form>
        </div>
        <div>
          <p>&copy; 2025 ColoColeccionables. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;