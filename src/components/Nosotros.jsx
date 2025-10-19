import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '/src/App.css';

const Nosotros = () => {
  return (
    <div className="nosotros">
      {/* Main Content */}
      <main>
        <section className="banner">
          <h2>Sobre Nosotros</h2>
          <p>Conoce la historia detrás de ColoColeccionables y nuestra pasión por el equipo más grande de Chile</p>
        </section>

        <section className="about-content">
          <div className="about-section">
            <h2>Nuestra Historia</h2>
            <p>
              ColoColeccionables nació en 2023 de la mano de un grupo de amigos y fervientes hinchas de Colo Colo, 
              unidos por una misma pasión: el equipo más popular y ganador de Chile. Nos dimos cuenta de que existía 
              una necesidad insatisfecha en la comunidad alba - los verdaderos seguidores merecían un lugar confiable 
              donde encontrar artículos coleccionables auténticos y de calidad.
            </p>
            <p>
              Lo que comenzó como un pequeño proyecto entre amigos, rápidamente se transformó en una iniciativa 
              seria comprometida con preservar y difundir la rica historia del Club Social y Deportivo Colo Colo 
              a través de objetos que trascienden el tiempo y se convierten en piezas de valor sentimental para 
              generaciones de hinchas.
            </p>
          </div>

          <div className="about-section">
            <h2>Nuestra Misión</h2>
            <p>
              En ColoColeccionables nos dedicamos a rescatar, preservar y ofrecer los artículos más emblemáticos 
              de la historia colocolina. Desde camisetas históricas que han visto levantar copas, hasta banderas 
              que han ondeado en los momentos más gloriosos del cacique.
            </p>
            <p>
              Cada producto en nuestro catálogo es cuidadosamente seleccionado para garantizar autenticidad, 
              calidad y ese valor sentimental que solo los verdaderos hinchas pueden apreciar. No somos solo 
              una tienda, somos custodios de la memoria alba.
            </p>
          </div>

          <div className="about-section">
            <h2>¿Por Qué Elegirnos?</h2>
            <div className="features-grid">
              <div className="feature-item">
                <h3> Autenticidad Garantizada</h3>
                <p>Todos nuestros productos son 100% oficiales o verificados por expertos coleccionistas</p>
              </div>
              <div className="feature-item">
                <h3> Pasión por lo Nuestro</h3>
                <p>Somos hinchas primero, empresarios después. Entendemos lo que significa cada pieza</p>
              </div>
              <div className="feature-item">
                <h3>Envíos a Todo Chile</h3>
                <p>Llevamos la historia del cacique a cada rincón del país</p>
              </div>
              <div className="feature-item">
                <h3> Comunidad Activa</h3>
                <p>Formamos parte de la misma hinchada, compartimos la misma pasión</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Nuestro Compromiso</h2>
            <p>
              Más que una tienda, somos un puente entre las glorias pasadas y las nuevas generaciones de 
              hinchas. Cada artículo que vendemos lleva consigo una historia, un recuerdo, un pedazo de 
              nuestra identidad como colocolinos.
            </p>
            <p>
              <strong>¡Contigo, siempre Colo Colo!</strong>
            </p>
          </div>
        </section>

        <section className="cta-section">
          <h2>¿Listo para empezar tu colección?</h2>
          <p>Explora nuestro catálogo y encuentra ese artículo especial que falta en tu colección</p>
          <Link to="/productos" className="btn-primary">Ver Catálogo Completo</Link>
        </section>
      </main>

      {/* Footer - Manteniendo el mismo footer de Home */}
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

export default Nosotros;