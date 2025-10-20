import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest'; 
import Contacto from './Contacto'; 


global.alert = vi.fn();

describe('Componente Contacto', () => {

  
  it('debería renderizar el formulario de contacto con todos sus campos', () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );


    expect(screen.getByRole('heading', { name: /Contáctanos/i })).toBeInTheDocument();


    expect(screen.getByLabelText(/Nombre completo:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Asunto:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensaje:/i)).toBeInTheDocument();


    expect(screen.getByRole('button', { name: /Enviar Mensaje/i })).toBeInTheDocument();
    
   
    expect(screen.getByText(/También puedes escribirnos a:/i)).toBeInTheDocument();
  });

 
  it('debería actualizar el estado cuando el usuario escribe en los campos', () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );

    const nombreInput = screen.getByLabelText(/Nombre completo:/i);
    const emailInput = screen.getByLabelText(/Correo electrónico:/i);
    const mensajeTextarea = screen.getByLabelText(/Mensaje:/i);

   
    fireEvent.change(nombreInput, { target: { value: 'Juan Perez' } });
    fireEvent.change(emailInput, { target: { value: 'juan@example.com' } });
    fireEvent.change(mensajeTextarea, { target: { value: 'Este es un mensaje de prueba' } });

  
    expect(nombreInput.value).toBe('Juan Perez');
    expect(emailInput.value).toBe('juan@example.com');
    expect(mensajeTextarea.value).toBe('Este es un mensaje de prueba');
  });


  it('debería limpiar los campos y mostrar una alerta al enviar el formulario', () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );

  
    const nombreInput = screen.getByLabelText(/Nombre completo:/i);
    const emailInput = screen.getByLabelText(/Correo electrónico:/i);
    const asuntoInput = screen.getByLabelText(/Asunto:/i);
    const mensajeTextarea = screen.getByLabelText(/Mensaje:/i);
    const submitButton = screen.getByRole('button', { name: /Enviar Mensaje/i });

  
    fireEvent.change(nombreInput, { target: { value: 'Ana López' } });
    fireEvent.change(emailInput, { target: { value: 'ana@correo.com' } });
    fireEvent.change(asuntoInput, { target: { value: 'Consulta' } });
    fireEvent.change(mensajeTextarea, { target: { value: 'Quisiera más información.' } });
    
   
    fireEvent.click(submitButton);

  
    expect(global.alert).toHaveBeenCalledWith('Mensaje enviado correctamente');

 
    expect(nombreInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(asuntoInput.value).toBe('');
    expect(mensajeTextarea.value).toBe('');
  });
});