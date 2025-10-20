import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Registro from './Registro';

// Mock para localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn()
};
global.localStorage = localStorageMock;

// Mock para window.alert
global.alert = vi.fn();

// Wrapper component para proporcionar el Router
const RenderWithRouter = ({ children }) => {
  return <Router>{children}</Router>;
};

describe('Registro Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(JSON.stringify([])); // Carrito vacío
  });

  test('renders registration form with all fields', () => {
    render(
      <RenderWithRouter>
        <Registro />
      </RenderWithRouter>
    );

    // Verificar título y descripción
    expect(screen.getByText('Crear Cuenta')).toBeDefined();
    expect(screen.getByText(/Regístrate para acceder a beneficios exclusivos/)).toBeDefined();

    // Verificar todos los campos del formulario
    expect(screen.getByLabelText(/RUN/i)).toBeDefined();
    expect(screen.getByLabelText(/Nombres/i)).toBeDefined();
    expect(screen.getByLabelText(/Apellidos/i)).toBeDefined();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeDefined();
    expect(screen.getByLabelText(/Fecha de Nacimiento/i)).toBeDefined();
    expect(screen.getByLabelText(/Región/i)).toBeDefined();
    expect(screen.getByLabelText(/Comuna/i)).toBeDefined();
    expect(screen.getByLabelText(/Dirección/i)).toBeDefined();
    expect(screen.getByLabelText(/Contraseña/i)).toBeDefined();
    expect(screen.getByLabelText(/Confirmar Contraseña/i)).toBeDefined();

    // Verificar botón de registro
    expect(screen.getByText('Registrarse')).toBeDefined();

    // Verificar enlace a login
    expect(screen.getByText(/Inicia sesión aquí/)).toBeDefined();
  });

  test('validates RUN format correctly', async () => {
    render(
      <RenderWithRouter>
        <Registro />
      </RenderWithRouter>
    );

    const runInput = screen.getByLabelText(/RUN/i);
    const submitButton = screen.getByText('Registrarse');

    // RUN inválido
    fireEvent.change(runInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Por favor ingrese un RUN válido (formato: 12345678-9)');
    });

    // RUN válido
    global.alert.mockClear();
    fireEvent.change(runInput, { target: { value: '12345678-9' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      // No debería mostrar error de RUN
      expect(global.alert).not.toHaveBeenCalledWith('Por favor ingrese un RUN válido (formato: 12345678-9)');
    });
  });

  test('validates password requirements', async () => {
    render(
      <RenderWithRouter>
        <Registro />
      </RenderWithRouter>
    );

    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByText('Registrarse');

    // Contraseña muy corta
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('La contraseña debe tener al menos 6 caracteres');
    });

    // Contraseña válida
    global.alert.mockClear();
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.alert).not.toHaveBeenCalledWith('La contraseña debe tener al menos 6 caracteres');
    });
  });

  test('validates password confirmation', async () => {
    render(
      <RenderWithRouter>
        <Registro />
      </RenderWithRouter>
    );

    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirmar Contraseña/i);
    const submitButton = screen.getByText('Registrarse');

    // Contraseñas no coinciden
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'differentpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Las contraseñas no coinciden');
    });

    // Contraseñas coinciden
    global.alert.mockClear();
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.alert).not.toHaveBeenCalledWith('Las contraseñas no coinciden');
    });
  });

  test('validates region and comuna selection', async () => {
    render(
      <RenderWithRouter>
        <Registro />
      </RenderWithRouter>
    );

    const submitButton = screen.getByText('Registrarse');

    // Sin seleccionar región y comuna
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Por favor seleccione región y comuna');
    });
  });

  test('filters comunas based on selected region', async () => {
    render(
      <RenderWithRouter>
        <Registro />
      </RenderWithRouter>
    );

    const regionSelect = screen.getByLabelText(/Región/i);
    const comunaSelect = screen.getByLabelText(/Comuna/i);

    // Comuna debería estar deshabilitada inicialmente
    expect(comunaSelect.disabled).toBe(true);

    // Seleccionar región
    fireEvent.change(regionSelect, { target: { value: 'rm' } });

    // Comuna debería estar habilitada ahora
    expect(comunaSelect.disabled).toBe(false);

    // Verificar que se cargan las comunas correctas
    await waitFor(() => {
      expect(screen.getByText('Santiago')).toBeDefined();
      expect(screen.getByText('Providencia')).toBeDefined();
      expect(screen.getByText('Las Condes')).toBeDefined();
    });
  });

  test('handles form input changes correctly', () => {
    render(
      <RenderWithRouter>
        <Registro />
      </RenderWithRouter>
    );

    const nombresInput = screen.getByLabelText(/Nombres/i);
    const emailInput = screen.getByLabelText(/Correo electrónico/i);

    // Cambiar valores
    fireEvent.change(nombresInput, { target: { value: 'Juan' } });
    fireEvent.change(emailInput, { target: { value: 'juan@test.com' } });

    expect(nombresInput.value).toBe('Juan');
    expect(emailInput.value).toBe('juan@test.com');
  });

  test('resets comuna when region changes', async () => {
    render(
      <RenderWithRouter>
        <Registro />
      </RenderWithRouter>
    );

    const regionSelect = screen.getByLabelText(/Región/i);
    const comunaSelect = screen.getByLabelText(/Comuna/i);

    // Seleccionar región y comuna
    fireEvent.change(regionSelect, { target: { value: 'rm' } });
    await waitFor(() => {
      fireEvent.change(comunaSelect, { target: { value: 'santiago' } });
    });

    expect(comunaSelect.value).toBe('santiago');

    // Cambiar región
    fireEvent.change(regionSelect, { target: { value: 'v' } });

    // Comuna debería resetearse
    await waitFor(() => {
      expect(comunaSelect.value).toBe('');
    });
  });

  test('submits form with valid data', async () => {
    render(
      <RenderWithRouter>
        <Registro />
      </RenderWithRouter>
    );

    // Llenar formulario con datos válidos
    fireEvent.change(screen.getByLabelText(/RUN/i), { target: { value: '12345678-9' } });
    fireEvent.change(screen.getByLabelText(/Nombres/i), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText(/Apellidos/i), { target: { value: 'Pérez' } });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'juan@test.com' } });
    fireEvent.change(screen.getByLabelText(/Región/i), { target: { value: 'rm' } });
    
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/Comuna/i), { target: { value: 'santiago' } });
    });
    
    fireEvent.change(screen.getByLabelText(/Dirección/i), { target: { value: 'Calle Falsa 123' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Confirmar Contraseña/i), { target: { value: 'password123' } });

    // Enviar formulario
    fireEvent.click(screen.getByText('Registrarse'));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Registro exitoso! (funcionalidad por implementar)');
    });
  });

  test('loads cart count from localStorage', () => {
    // Mock carrito con items
    const mockCarrito = [
      { id: 1, nombre: 'Producto 1', cantidad: 2 },
      { id: 2, nombre: 'Producto 2', cantidad: 1 }
    ];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockCarrito));

    render(
      <RenderWithRouter>
        <Registro />
      </RenderWithRouter>
    );

    // Verificar que se llamó a localStorage
    expect(localStorageMock.getItem).toHaveBeenCalledWith('carrito');
  });

  test('has proper HTML attributes for accessibility', () => {
    render(
      <RenderWithRouter>
        <Registro />
      </RenderWithRouter>
    );

    const runInput = screen.getByLabelText(/RUN/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);

    // Verificar atributos de accesibilidad
    expect(runInput).toHaveAttribute('required');
    expect(runInput).toHaveAttribute('pattern');
    expect(runInput).toHaveAttribute('title');
    expect(passwordInput).toHaveAttribute('minLength', '6');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('displays correct options for regions and comunas', () => {
    render(
      <RenderWithRouter>
        <Registro />
      </RenderWithRouter>
    );

    // Verificar opciones de región
    expect(screen.getByText('Región Metropolitana')).toBeDefined();
    expect(screen.getByText('Valparaíso')).toBeDefined();
    expect(screen.getByText('Biobío')).toBeDefined();

    // Verificar opción por defecto
    expect(screen.getByText('Seleccione una región')).toBeDefined();
    expect(screen.getByText('Seleccione una comuna')).toBeDefined();
  });
});