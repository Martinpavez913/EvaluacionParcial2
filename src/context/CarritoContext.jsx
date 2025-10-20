import { createContext, useContext, useReducer, useEffect } from 'react';

const CarritoContext = createContext();

// Reducer para manejar el estado
const carritoReducer = (state, action) => {
  switch (action.type) {
    case 'CARGAR_CARRITO':
      return action.payload;
    
    case 'AGREGAR_PRODUCTO':
      const { producto, talla = null, cantidad = 1 } = action.payload;
      const clave = talla ? `${producto.id}-${talla}` : producto.id.toString();
      
      const existenteIndex = state.findIndex(item => item.clave === clave);
      
      if (existenteIndex >= 0) {
        return state.map((item, index) =>
          index === existenteIndex
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...state, {
          ...producto,
          clave,
          cantidad,
          tallaSeleccionada: talla
        }];
      }
    
    case 'ELIMINAR_PRODUCTO':
      return state.filter(item => item.clave !== action.payload);
    
    case 'ACTUALIZAR_CANTIDAD':
      if (action.payload.nuevaCantidad < 1) return state;
      return state.map(item =>
        item.clave === action.payload.clave
          ? { ...item, cantidad: action.payload.nuevaCantidad }
          : item
      );
    
    case 'VACIAR_CARRITO':
      return [];
    
    default:
      return state;
  }
};

export const CarritoProvider = ({ children }) => {
  const [carrito, dispatch] = useReducer(carritoReducer, []);

  // Cargar desde localStorage
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    dispatch({ type: 'CARGAR_CARRITO', payload: carritoGuardado });
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  // Acciones
  const agregarAlCarrito = (producto, talla = null, cantidad = 1) => {
    dispatch({ type: 'AGREGAR_PRODUCTO', payload: { producto, talla, cantidad } });
  };

  const eliminarProducto = (clave) => {
    dispatch({ type: 'ELIMINAR_PRODUCTO', payload: clave });
  };

  const actualizarCantidad = (clave, nuevaCantidad) => {
    dispatch({ type: 'ACTUALIZAR_CANTIDAD', payload: { clave, nuevaCantidad } });
  };

  const vaciarCarrito = () => {
    dispatch({ type: 'VACIAR_CARRITO' });
  };

  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);

  const totalPrecio = carrito.reduce((total, item) => {
    const precioTexto = item.precioActual || '';
    const precio = parseInt(precioTexto.replace(/[^\d]/g, '')) || 0;
    return total + (precio * item.cantidad);
  }, 0);

  const value = {
    carrito,
    agregarAlCarrito,
    eliminarProducto,
    actualizarCantidad,
    vaciarCarrito,
    cantidadTotal,
    totalPrecio
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};

// ✅ Hook con el mismo nombre que antes
export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  }
  return context;
};