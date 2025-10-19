import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import InicioSesion from './components/InicioSesion';
import Contacto from './components/Contacto';
import Productos from './components/Productos';
import Footer from './components/Footer';
import Nosotros from './components/Nosotros';
import Blogs from './components/Blogs';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio-sesion" element={<InicioSesion />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/blogs" element={<Blogs />} />
        {/* Aquí agregarás las demás rutas después */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;