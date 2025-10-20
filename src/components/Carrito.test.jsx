import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';
import Carrito from './Carrito';

// Mock del hook useCarrito - FORMA CORRECTA PARA VITEST
vi.mock('../context/CarritoContext', () => ({
  useCarrito: vi.fn()
}));

// Importar después del mock
import { useCarrito } from '../context/CarritoContext';

const carritoLleno = [
  {
    clave: '1',
    nombre: 'Camiseta ColoColo',
    descripcion: 'Descripción corta',
    precioActual: '$20.000',
    cantidad: 1,
    imagen: '/img/camiseta.png',
    alt: 'Camiseta',
    tallaSeleccionada: null
  },
];

const carritoVacio = [];

describe('Componente Carrito', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Configurar mock por defecto
    useCarrito.mockReturnValue({
      carrito: carritoLleno,
      eliminarProducto: vi.fn(),
      actualizarCantidad: vi.fn(),
      vaciarCarrito: vi.fn(),
      cantidadTotal: 1,
      totalPrecio: 20000,
    });
  });

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
    expect(screen.getByText(/Descripción corta/i)).toBeInTheDocument();
    
    // Verificar que hay precios (pueden ser múltiples)
    const precios = screen.getAllByText(/\$20\.000/);
    expect(precios.length).toBeGreaterThan(0);

    // Verificar cantidad
    expect(screen.getByText(/Cantidad:/i)).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();

    // Verificar botones
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Vaciar Carrito/i })).toBeInTheDocument();
    expect(screen.getByTitle('Eliminar producto')).toBeInTheDocument();
  });

  it('debería llamar a vaciarCarrito al hacer click en "Vaciar Carrito"', () => {
    const mockVaciarCarrito = vi.fn();
    useCarrito.mockReturnValue({
      carrito: carritoLleno,
      eliminarProducto: vi.fn(),
      actualizarCantidad: vi.fn(),
      vaciarCarrito: mockVaciarCarrito,
      cantidadTotal: 1,
      totalPrecio: 20000,
    });

    // Mock de window.confirm
    const confirmMock = vi.spyOn(window, 'confirm');
    confirmMock.mockImplementation(() => true);

    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    );

    const botonVaciar = screen.getByRole('button', { name: /Vaciar Carrito/i });
    fireEvent.click(botonVaciar);

    expect(mockVaciarCarrito).toHaveBeenCalledOnce();
    confirmMock.mockRestore();
  });

  it('debería actualizar la cantidad al hacer click en "+"', () => {
    const mockActualizarCantidad = vi.fn();
    useCarrito.mockReturnValue({
      carrito: carritoLleno,
      eliminarProducto: vi.fn(),
      actualizarCantidad: mockActualizarCantidad,
      vaciarCarrito: vi.fn(),
      cantidadTotal: 1,
      totalPrecio: 20000,
    });

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
    useCarrito.mockReturnValueOnce({
      carrito: carritoVacio,
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

  it('NO debería llamar a vaciarCarrito si el usuario cancela', () => {
    const mockVaciarCarrito = vi.fn();
    useCarrito.mockReturnValue({
      carrito: carritoLleno,
      eliminarProducto: vi.fn(),
      actualizarCantidad: vi.fn(),
      vaciarCarrito: mockVaciarCarrito,
      cantidadTotal: 1,
      totalPrecio: 20000,
    });

    const confirmMock = vi.spyOn(window, 'confirm');
    confirmMock.mockImplementation(() => false);

    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    );

    const botonVaciar = screen.getByRole('button', { name: /Vaciar Carrito/i });
    fireEvent.click(botonVaciar);

    expect(mockVaciarCarrito).not.toHaveBeenCalled();
    confirmMock.mockRestore();
  });

  it('debería llamar a eliminarProducto al hacer click en el botón eliminar', () => {
    const mockEliminarProducto = vi.fn();
    useCarrito.mockReturnValue({
      carrito: carritoLleno,
      eliminarProducto: mockEliminarProducto,
      actualizarCantidad: vi.fn(),
      vaciarCarrito: vi.fn(),
      cantidadTotal: 1,
      totalPrecio: 20000,
    });

    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    );

    const botonEliminar = screen.getByTitle('Eliminar producto');
    fireEvent.click(botonEliminar);

    expect(mockEliminarProducto).toHaveBeenCalledWith('1');
  });

  it('debería deshabilitar el botón "-" cuando la cantidad es 1', () => {
    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    );

    const botonRestar = screen.getByRole('button', { name: '-' });
    expect(botonRestar).toBeDisabled();
  });

  it('debería mostrar el resumen del pedido correctamente', () => {
    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    );

    expect(screen.getByText(/Resumen del Pedido/i)).toBeInTheDocument();
    expect(screen.getByText(/Productos \(1\):/)).toBeInTheDocument();
    expect(screen.getByText(/Envío:/)).toBeInTheDocument();
    expect(screen.getByText(/Gratis/)).toBeInTheDocument();
    expect(screen.getByText(/Total:/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Proceder al Pago/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Seguir Comprando/i })).toBeInTheDocument();
  });
});