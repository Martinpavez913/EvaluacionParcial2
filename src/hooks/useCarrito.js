import { useState, useEffect, useCallback } from 'react';

export const useCarrito = () => {
  const [carrito, setCarrito] = useState([]);

  console.log('🔄 useCarrito: Inicializando');

  // Cargar estado inicial desde localStorage
  useEffect(() => {
    console.log('📥 useCarrito: Cargando de localStorage');
    try {
      const stored = localStorage.getItem('carrito');
      const carritoGuardado = stored ? JSON.parse(stored) : [];
      console.log('📦 useCarrito: Carrito cargado:', carritoGuardado);
      setCarrito(carritoGuardado);
    } catch (error) {
      console.error('❌ useCarrito: Error cargando:', error);
      setCarrito([]);
    }
  }, []);

  // Guardar en localStorage cuando cambie el carrito
  useEffect(() => {
    console.log('💾 useCarrito: Guardando en localStorage:', carrito);
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  // Función para agregar producto - MUY SIMPLE
  const agregarAlCarrito = useCallback((producto) => {
    console.log('➕ useCarrito: Agregando producto:', producto.nombre);
    
    setCarrito(prevCarrito => {
      console.log('📝 useCarrito: Estado anterior:', prevCarrito);
      
      // Buscar si el producto ya existe
      const existenteIndex = prevCarrito.findIndex(item => item.id === producto.id);
      
      let nuevoCarrito;
      if (existenteIndex >= 0) {
        // Producto existe, incrementar cantidad
        nuevoCarrito = prevCarrito.map((item, index) => 
          index === existenteIndex 
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      } else {
        // Producto nuevo, agregar
        nuevoCarrito = [...prevCarrito, {
          ...producto,
          cantidad: 1,
          clave: producto.id.toString() // clave simple
        }];
      }
      
      console.log('🆕 useCarrito: Nuevo estado:', nuevoCarrito);
      return nuevoCarrito;
    });
  }, []);

  // Eliminar producto
  const eliminarProducto = useCallback((clave) => {
    console.log('🗑️ useCarrito: Eliminando producto con clave:', clave);
    setCarrito(prev => prev.filter(item => item.clave !== clave));
  }, []);

  // Actualizar cantidad
  const actualizarCantidad = useCallback((clave, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    console.log('🔢 useCarrito: Actualizando cantidad:', clave, '->', nuevaCantidad);
    setCarrito(prev => 
      prev.map(item => 
        item.clave === clave ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  }, []);

  // Vaciar carrito
  const vaciarCarrito = useCallback(() => {
    console.log('🧹 useCarrito: Vaciando carrito');
    setCarrito([]);
  }, []);

  const cantidadTotal = carrito.reduce((total, item) => total + (item.cantidad || 1), 0);

  // Calcular total precio
  const totalPrecio = carrito.reduce((total, item) => {
    const precioTexto = item.precioActual || '';
    const precio = parseInt(precioTexto.replace(/[^\d]/g, '')) || 0;
    return total + (precio * (item.cantidad || 1));
  }, 0);

  console.log('📊 useCarrito: Estado actual -', carrito.length, 'items, Total:', cantidadTotal);

  return {
    carrito,
    agregarAlCarrito,
    eliminarProducto,
    actualizarCantidad,
    vaciarCarrito,
    cantidadTotal,
    totalPrecio
  };
};