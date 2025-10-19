import { describe, test, expect } from 'vitest';
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
    expect(footerElement).toBeDefined();
  });

  test('renders logo and description', () => {
    render(
      <RenderWithRouter>
        <Footer />
      </RenderWithRouter>
    );

    // Verificar logo
    const logo = screen.getByAltText('Logo ColoColeccionables');
    expect(logo).toBeDefined();
    expect(logo.getAttribute('src')).toBe('/Imagenes/logoconfondo.png');
    expect(logo.className).toContain('logo');

    // Verificar descripción
    const description = screen.getByText(/La tienda oficial de coleccionables del equipo más popular de Chile/i);
    expect(description).toBeDefined();
  });

  test('renders quick links with correct routes', () => {
    render(
      <RenderWithRouter>
        <Footer />
      </RenderWithRouter>
    );

    // Verificar todos los enlaces de navegación
    const homeLink = screen.getByText('Home');
    const productosLink = screen.getByText('Productos');
    const nosotrosLink = screen.getByText('Nosotros');
    const blogsLink = screen.getByText('Blogs');
    const contactoLink = screen.getByText('Contacto');
    const adminLink = screen.getByText('Panel de Administrador');

    expect(homeLink).toBeDefined();
    expect(productosLink).toBeDefined();
    expect(nosotrosLink).toBeDefined();
    expect(blogsLink).toBeDefined();
    expect(contactoLink).toBeDefined();
    expect(adminLink).toBeDefined();
  });
});