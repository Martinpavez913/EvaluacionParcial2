import { useState, useEffect, useCallback } from 'react';

export const useCarrito = () => {
  const [carrito, setCarrito] = useState([]);

  // Sincronización entre pestañas/components
  useEffect(() => {
    const handleStorageChange = () => {
      const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
      setCarrito(carritoGuardado);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Cargar estado inicial desde localStorage
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);
  }, []);

  // Persistir cambios en localStorage
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  // Agregar al carrito
  const agregarAlCarrito = useCallback((producto, talla = null, cantidad = 1) => {
    const clave = talla ? `${producto.id}-${talla}` : producto.id.toString();
    
    setCarrito(prev => {
      const existente = prev.find(item => item.clave === clave);
      
      if (existente) {
        return prev.map(item =>
          item.clave === clave 
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...prev, {
          ...producto,
          clave,
          cantidad,
          tallaSeleccionada: talla
        }];
      }
    });
  }, []);

  // Eliminar producto
  const eliminarProducto = useCallback((clave) => {
    setCarrito(prev => prev.filter(item => item.clave !== clave));
  }, []);

  // Actualizar cantidad
  const actualizarCantidad = useCallback((clave, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    setCarrito(prev => 
      prev.map(item => 
        item.clave === clave ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  }, []);

  // Vaciar carrito
  const vaciarCarrito = useCallback(() => {
    setCarrito([]);
  }, []);

  // Calcular cantidad total
  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);

  return {
    carrito,
    agregarAlCarrito,
    eliminarProducto,
    actualizarCantidad,
    vaciarCarrito,
    cantidadTotal
  };
};