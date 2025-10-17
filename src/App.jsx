import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import InicioSesion from './components/InicioSesion';
import Contacto from './components/Contacto'
import Productos from './components/Productos'
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio-sesion" element={<InicioSesion />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/Productos" element={<Productos />} />
        {/* Aquí agregarás las demás rutas después */}
      <Footer />
      </Routes>
    </Router>
  );
}

export default App;