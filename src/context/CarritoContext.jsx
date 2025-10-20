import { createContext, useContext } from 'react';
import { useCarrito } from '../hooks/useCarrito';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const carrito = useCarrito(); // una sola instancia global
  return (
    <CarritoContext.Provider value={carrito}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarritoContext = () => useContext(CarritoContext);
