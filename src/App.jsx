import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import InicioSesion from './components/InicioSesion';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio-sesion" element={<InicioSesion />} />
        {/* Aquí agregarás las demás rutas después */}
      </Routes>
    </Router>
  );
}

export default App;