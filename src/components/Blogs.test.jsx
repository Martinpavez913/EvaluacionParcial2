import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CarritoProvider } from '../context/CarritoContext';
import Blogs from './Blogs';

describe('Componente Blogs', () => {

  // Test 1: Renderizado de los blogs
  it('debería renderizar todos los blogs con sus títulos, extractos y botones', () => {
    render(
      <CarritoProvider>
        <MemoryRouter>
          <Blogs />
        </MemoryRouter>
      </CarritoProvider>
    );

    // Verificar títulos de blogs
    const titulos = [
      /La Historia de la Camiseta Albiceleste/i,
      /Arturo Vidal: El Regreso del Rey/i,
      /Los 10 Objetos Más Buscados por Coleccionistas/i,
      /Cómo Conservar Tus Artículos Coleccionables/i
    ];
    titulos.forEach(titulo => {
      expect(screen.getByText(titulo)).toBeInTheDocument();
    });

    // Verificar que existen botones "Leer Más"
    const botonesLeerMas = screen.getAllByRole('link', { name: /Leer Más/i });
    expect(botonesLeerMas.length).toBe(4);
  });

  // Test 2: Renderizado de la sección newsletter
  it('debería renderizar la sección de newsletter con input y botón', () => {
    render(
      <CarritoProvider>
        <MemoryRouter>
          <Blogs />
        </MemoryRouter>
      </CarritoProvider>
    );

    expect(screen.getByRole('heading', { name: /No Te Pierdas Ninguna Noticia/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ingresa tu correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Suscribirse/i })).toBeInTheDocument();
  });

  // Test 3: Permitir ingresar correo en newsletter
  it('debería permitir ingresar un correo en el formulario de newsletter', () => {
    render(
      <CarritoProvider>
        <MemoryRouter>
          <Blogs />
        </MemoryRouter>
      </CarritoProvider>
    );

    const inputEmail = screen.getByPlaceholderText(/Ingresa tu correo electrónico/i);
    fireEvent.change(inputEmail, { target: { value: 'test@example.com' } });
    expect(inputEmail.value).toBe('test@example.com');
  });

  // Test 4: Prevenir envío del formulario de newsletter
  // Test limpio para prevenir envío
it('debería prevenir el envío del formulario de newsletter', () => {
  render(
    <CarritoProvider>
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>
    </CarritoProvider>
  );

  const form = screen.getByRole('form', { name: /Formulario Newsletter/i });
  const inputEmail = screen.getByPlaceholderText(/Ingresa tu correo electrónico/i);

  // Cambiar valor del input
  fireEvent.change(inputEmail, { target: { value: 'test@example.com' } });
  expect(inputEmail.value).toBe('test@example.com');

  // Crear evento submit con spy
  const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
  submitEvent.preventDefault = vi.fn();

  form.dispatchEvent(submitEvent);

  // Verificar que preventDefault se llamó
  expect(submitEvent.preventDefault).toHaveBeenCalled();

  // Verificar que input mantiene valor después del submit
  expect(inputEmail.value).toBe('test@example.com');
});

});
