import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import InicioSesion from './components/InicioSesion';
import Contacto from './components/Contacto'
import Nav from './components/Nav';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio-sesion" element={<InicioSesion />} />
        <Route path="/contacto" element={<Contacto />} />
        {/* Aquí agregarás las demás rutas después */}
      </Routes>
    </Router>
  );
}

export default App;