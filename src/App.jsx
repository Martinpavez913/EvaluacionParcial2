import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import InicioSesion from './components/InicioSesion';
import Contacto from './components/Contacto';
import Productos from './components/Productos';
import Footer from './components/Footer';
import Nosotros from './components/Nosotros';
import Blogs from './components/Blogs';
import Registro from './components/Registro';
import DetalleProducto from './components/DetalleProducto';
import Admin from './components/Admin';
import AdminAgregarProducto from './components/AdminAgregarProducto';
import AdminModificarProducto from './components/AdminModificarProducto';
import AdminEliminarProducto from './components/AdminEliminarProducto';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas (con Nav y Footer) */}
        <Route path="/*" element={
          <>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/inicio-sesion" element={<InicioSesion />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/detalle-producto/:id" element={<DetalleProducto />} />
            </Routes>
            <Footer />
          </>
        } />
        
        {/* Rutas de administración (SIN Nav y Footer, ellos tienen su propio diseño) */}
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/admin/productos/nuevo" element={<AdminAgregarProducto />} />
        <Route path="/admin/productos/editar" element={<AdminModificarProducto />} />
        <Route path="/admin/productos/eliminar" element={<AdminEliminarProducto />} />
        
        {/* Aquí agregarás las demás rutas después */}
      </Routes>
    </Router>
  );
}

export default App;