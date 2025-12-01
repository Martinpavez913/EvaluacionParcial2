// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import Layout from './layouts/Layout';

import Home from './components/Home';
import InicioSesion from './components/InicioSesion';
import Contacto from './components/Contacto';
import Productos from './components/Productos';
import Nosotros from './components/Nosotros';
import Blogs from './components/Blogs';
import Registro from './components/Registro';
import DetalleProducto from './components/DetalleProducto';
import Carrito from './components/Carrito';

import Admin from './components/Admin';
import AdminAgregarProducto from './components/AdminAgregarProducto';
import AdminModificarProducto from './components/AdminModificarProducto';
import AdminEliminarProducto from './components/AdminEliminarProducto';

import { CarritoProvider } from './context/CarritoContext';
import { SessionProvider } from './context/sessionContext';
import ProtectedRoute from './protect/ProtectedRoute';

function App() {
  return (
    <SessionProvider>
      <CarritoProvider>
        <Router>
          <Routes>

            {/* ==== RUTAS PÚBLICAS CON NAV Y FOOTER ==== */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/inicio-sesion" element={<InicioSesion />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/detalle-producto/:id" element={<DetalleProducto />} />
              <Route path="/carrito" element={<Carrito />} />
            </Route>

            {/* ==== RUTAS ADMIN PROTEGIDAS ==== */}
            <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
              <Route path="/admin/*" element={<Admin />} />
              <Route path="/admin/productos/nuevo" element={<AdminAgregarProducto />} />
              <Route path="/admin/productos/editar" element={<AdminModificarProducto />} />
              <Route path="/admin/productos/eliminar" element={<AdminEliminarProducto />} />
            </Route>

          </Routes>
        </Router>
      </CarritoProvider>
    </SessionProvider>
  );
}

export default App;
