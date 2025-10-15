import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import InicioSesion from './components/InicioSesion';
import Productos from './components/Productos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio-sesion" element={<InicioSesion />} />
        <Route path="/productos" element={<Productos />} />
        {/* Aquí agregarás las demás rutas después */}
      </Routes>
    </Router>
  );
}

export default App;