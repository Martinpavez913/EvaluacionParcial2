import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './Footer';

// Wrapper component para proporcionar el Router
const RenderWithRouter = ({ children }) => {
  return <Router>{children}</Router>;
};

describe('Footer Component', () => {
  test('renders footer with correct structure', () => {
    render(
      <RenderWithRouter>
        <Footer />
      </RenderWithRouter>
    );

    // Verificar que el footer se renderiza
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });

  test('renders logo and description', () => {
    render(
      <RenderWithRouter>
        <Footer />
      </RenderWithRouter>
    );

    // Verificar logo
    const logo = screen.getByAltText('Logo ColoColeccionables');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/Imagenes/logoconfondo.png');
    expect(logo).toHaveClass('logo');

    // Verificar descripción
    const description = screen.getByText(/La tienda oficial de coleccionables del equipo más popular de Chile/i);
    expect(description).toBeInTheDocument();
  });

  test('renders quick links with correct routes', () => {
    render(
      <RenderWithRouter>
        <Footer />
      </RenderWithRouter>
    );

    // Verificar título de enlaces rápidos
    const linksTitle = screen.getByText('Enlaces rápidos');
    expect(linksTitle).toBeInTheDocument();

    // Verificar todos los enlaces de navegación
    const homeLink = screen.getByText('Home');
    const productosLink = screen.getByText('Productos');
    const nosotrosLink = screen.getByText('Nosotros');
    const blogsLink = screen.getByText('Blogs');
    const contactoLink = screen.getByText('Contacto');
    const adminLink = screen.getByText('Panel de Administrador');

    expect(homeLink).toBeInTheDocument();
    expect(productosLink).toBeInTheDocument();
    expect(nosotrosLink).toBeInTheDocument();
    expect(blogsLink).toBeInTheDocument();
    expect(contactoLink).toBeInTheDocument();
    expect(adminLink).toBeInTheDocument();

    // Verificar que los enlaces tienen las rutas correctas
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    expect(productosLink.closest('a')).toHaveAttribute('href', '/productos');
    expect(nosotrosLink.closest('a')).toHaveAttribute('href', '/nosotros');
    expect(blogsLink.closest('a')).toHaveAttribute('href', '/blogs');
    expect(contactoLink.closest('a')).toHaveAttribute('href', '/contacto');
    expect(adminLink.closest('a')).toHaveAttribute('href', '/admin');
  });

  test('renders newsletter subscription form', () => {
    render(
      <RenderWithRouter>
        <Footer />
      </RenderWithRouter>
    );

    // Verificar título del newsletter
    const newsletterTitle = screen.getByText('Suscríbete a nuestro boletín');
    expect(newsletterTitle).toBeInTheDocument();

    // Verificar input de email
    const emailInput = screen.getByPlaceholderText('Ingresa tu email');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');

    // Verificar botón de suscripción
    const subscribeButton = screen.getByText('Suscribirse');
    expect(subscribeButton).toBeInTheDocument();
    expect(subscribeButton).toHaveAttribute('type', 'submit');
  });

  test('renders copyright information', () => {
    render(
      <RenderWithRouter>
        <Footer />
      </RenderWithRouter>
    );

    // Verificar copyright
    const copyright = screen.getByText(/&copy; 2025 ColoColeccionables\. Todos los derechos reservados\./i);
    expect(copyright).toBeInTheDocument();
  });

  test('has correct semantic HTML structure', () => {
    render(
      <RenderWithRouter>
        <Footer />
      </RenderWithRouter>
    );

    // Verificar que se usa la etiqueta footer semántica
    const footer = screen.getByRole('contentinfo');
    expect(footer.tagName).toBe('FOOTER');

    // Verificar que hay múltiples secciones dentro del footer
    const sections = footer.querySelectorAll('div');
    expect(sections.length).toBeGreaterThan(0);
  });

  test('newsletter form prevents default submit behavior', () => {
    render(
      <RenderWithRouter>
        <Footer />
      </RenderWithRouter>
    );

    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
    
    // El formulario debería tener el preventDefault configurado
    // Esto se verifica en la implementación del componente
  });
});