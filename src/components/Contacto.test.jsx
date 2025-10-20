import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest'; // Importante: para tener acceso a los matchers de jest-dom
import Contacto from './Contacto'; // Asegúrate de que la ruta sea correcta

// Mock de la función alert global
global.alert = vi.fn();

describe('Componente Contacto', () => {

  // Test 1: Verificar que el componente se renderiza correctamente
  it('debería renderizar el formulario de contacto con todos sus campos', () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );

    // Verificar que el título principal está presente
    expect(screen.getByRole('heading', { name: /Contáctanos/i })).toBeInTheDocument();

    // Verificar que los campos de entrada (inputs y textarea) están presentes
    expect(screen.getByLabelText(/Nombre completo:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Asunto:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensaje:/i)).toBeInTheDocument();

    // Verificar que el botón de envío está presente
    expect(screen.getByRole('button', { name: /Enviar Mensaje/i })).toBeInTheDocument();
    
    // Verificar el texto alternativo de contacto
    expect(screen.getByText(/También puedes escribirnos a:/i)).toBeInTheDocument();
  });

  // Test 2: Verificar que los campos del formulario se actualizan al escribir en ellos
  it('debería actualizar el estado cuando el usuario escribe en los campos', () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );

    const nombreInput = screen.getByLabelText(/Nombre completo:/i);
    const emailInput = screen.getByLabelText(/Correo electrónico:/i);
    const mensajeTextarea = screen.getByLabelText(/Mensaje:/i);

    // Simular entrada de usuario
    fireEvent.change(nombreInput, { target: { value: 'Juan Perez' } });
    fireEvent.change(emailInput, { target: { value: 'juan@example.com' } });
    fireEvent.change(mensajeTextarea, { target: { value: 'Este es un mensaje de prueba' } });

    // Verificar que el valor de los inputs ha cambiado
    expect(nombreInput.value).toBe('Juan Perez');
    expect(emailInput.value).toBe('juan@example.com');
    expect(mensajeTextarea.value).toBe('Este es un mensaje de prueba');
  });

  // Test 3: Verificar el envío del formulario
  it('debería limpiar los campos y mostrar una alerta al enviar el formulario', () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );

    // Obtener los campos y el botón
    const nombreInput = screen.getByLabelText(/Nombre completo:/i);
    const emailInput = screen.getByLabelText(/Correo electrónico:/i);
    const asuntoInput = screen.getByLabelText(/Asunto:/i);
    const mensajeTextarea = screen.getByLabelText(/Mensaje:/i);
    const submitButton = screen.getByRole('button', { name: /Enviar Mensaje/i });

    // Llenar el formulario
    fireEvent.change(nombreInput, { target: { value: 'Ana López' } });
    fireEvent.change(emailInput, { target: { value: 'ana@correo.com' } });
    fireEvent.change(asuntoInput, { target: { value: 'Consulta' } });
    fireEvent.change(mensajeTextarea, { target: { value: 'Quisiera más información.' } });
    
    // Simular el envío del formulario
    fireEvent.click(submitButton);

    // Verificar que la función alert fue llamada
    expect(global.alert).toHaveBeenCalledWith('Mensaje enviado correctamente');

    // Verificar que los campos se han limpiado después del envío
    expect(nombreInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(asuntoInput.value).toBe('');
    expect(mensajeTextarea.value).toBe('');
  });
});