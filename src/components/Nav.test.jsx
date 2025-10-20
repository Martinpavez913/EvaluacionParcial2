import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import Nav from './Nav';
import { vi } from 'vitest';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../context/CarritoContext', () => ({
  useCarrito: vi.fn(),
}));

describe('Nav Component - Tests mínimos', () => {
  beforeEach(() => {
    useCarrito.mockReturnValue({ cantidadTotal: 3 });
    mockNavigate.mockReset();
  });

  test('Renderiza logo, nav links y carrito', () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    expect(screen.getByAltText(/Logo ColoColeccionables/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Productos/i)).toBeInTheDocument();
    expect(screen.getByText(/Carrito \(3\)/i)).toBeInTheDocument();
  });

  test('Carrito refleja cantidad correcta desde contexto', () => {
    useCarrito.mockReturnValue({ cantidadTotal: 5 });

    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    expect(screen.getByText(/Carrito \(5\)/i)).toBeInTheDocument();
  });

  test('Busqueda navega con navigate al hacer submit', () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/Buscar productos/i);
    fireEvent.change(input, { target: { value: 'figurita' } });
    fireEvent.submit(input.closest('form'));

    expect(mockNavigate).toHaveBeenCalledWith('/productos?search=figurita');
    expect(input.value).toBe('');
  });
});
