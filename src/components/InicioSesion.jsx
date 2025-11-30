import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "/src/App.css";

const InicioSesion = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/autenticador/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        alert("Credenciales incorrectas");
        return;
      }

      const data = await response.json();

      // Guardar sesión
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Sesión iniciada correctamente");

      navigate("/"); // redirigir al home
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error al conectarse con el servidor");
    }
  };

  return (
    <div className="inicio-sesion">
      <main>
        <section className="login-section">
          <h2>Iniciar Sesión</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit">Iniciar Sesión</button>
          </form>

          <div className="login-links">
            <p>
              ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default InicioSesion;
