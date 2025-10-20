import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Nosotros from './Nosotros';
import { describe, test, expect } from 'vitest';

describe('Nosotros Component', () => {
  
  test('Renderiza los títulos principales', () => {
    render(
      <MemoryRouter>
        <Nosotros />
      </MemoryRouter>
    );

    expect(screen.getByText('Nuestra Historia')).toBeInTheDocument();
    expect(screen.getByText('Nuestra Misión')).toBeInTheDocument();
    expect(screen.getByText('¿Por Qué Elegirnos?')).toBeInTheDocument();
    expect(screen.getByText('Nuestro Compromiso')).toBeInTheDocument();
    expect(screen.getByText('¿Listo para empezar tu colección?')).toBeInTheDocument();
  });

  test('Renderiza la sección de características con todos los items', () => {
    render(
      <MemoryRouter>
        <Nosotros />
      </MemoryRouter>
    );

    expect(screen.getByText(/Autenticidad Garantizada/i)).toBeInTheDocument();
    expect(screen.getByText(/Pasión por lo Nuestro/i)).toBeInTheDocument();
    expect(screen.getByText(/Envíos a Todo Chile/i)).toBeInTheDocument();
    expect(screen.getByText(/Comunidad Activa/i)).toBeInTheDocument();
  });

  test('Renderiza el link al catálogo de productos', () => {
    render(
      <MemoryRouter>
        <Nosotros />
      </MemoryRouter>
    );

    const link = screen.getByText('Ver Catálogo Completo');
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/productos');
  });

});
