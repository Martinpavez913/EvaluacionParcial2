import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest'; // para matchers como toBeInTheDocument
import Carrito from './Carrito'; // ajusta la ruta según tu proyecto

// Mock del hook useCarrito
const mockEliminarProducto = vi.fn();
const mockActualizarCantidad = vi.fn();
const mockVaciarCarrito = vi.fn();

const carritoLleno = [
  {
    clave: '1',
    nombre: 'Camiseta ColoColo',
    descripcion: 'Descripción corta',
    precioActual: '$20.000',
    cantidad: 1,
    imagen: '/img/camiseta.png',
    alt: 'Camiseta',
  },
];

// Mock del hook
vi.mock('../context/CarritoContext', () => ({
  useCarrito: () => ({
    carrito: carritoLleno,
    eliminarProducto: mockEliminarProducto,
    actualizarCantidad: mockActualizarCantidad,
    vaciarCarrito: mockVaciarCarrito,
    cantidadTotal: 1,
    totalPrecio: 20000,
  }),
}));

describe('Componente Carrito', () => {

  it('debería renderizar el carrito con productos correctamente', () => {
    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    );

    // Verificar título
    expect(screen.getByRole('heading', { name: /Carrito de Compras/i })).toBeInTheDocument();

    // Verificar producto
    expect(screen.getByText(/Camiseta ColoColo/i)).toBeInTheDocument();
    expect(screen.getAllByText(/\$20.000/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Cantidad:/i)).toBeInTheDocument();

    // Verificar botones
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Vaciar Carrito/i })).toBeInTheDocument();
  });

  it('debería llamar a vaciarCarrito al hacer click en "Vaciar Carrito"', () => {
    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    );

    const botonVaciar = screen.getByRole('button', { name: /Vaciar Carrito/i });
    fireEvent.click(botonVaciar);

    expect(mockVaciarCarrito).toHaveBeenCalled();
  });

  it('debería actualizar la cantidad al hacer click en "+"', () => {
    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    );

    const botonSumar = screen.getByRole('button', { name: '+' });
    fireEvent.click(botonSumar);

    expect(mockActualizarCantidad).toHaveBeenCalledWith('1', 2);
  });

  it('debería renderizar el carrito vacío correctamente', () => {
    // Re-mock temporal para carrito vacío
    vi.mocked(require('../context/CarritoContext').useCarrito).mockReturnValueOnce({
      carrito: [],
      eliminarProducto: vi.fn(),
      actualizarCantidad: vi.fn(),
      vaciarCarrito: vi.fn(),
      cantidadTotal: 0,
      totalPrecio: 0,
    });

    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    );

    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
    expect(screen.getByText(/Agrega algunos productos increíbles/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Explorar Productos/i })).toBeInTheDocument();
  });

});
