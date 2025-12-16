// src/components/Admin/AgregarProducto.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import NavAdmin from "./NavAdmin"; // Ajusta según tu estructura de componentes

const AdminAgregarProducto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    descripcionLarga: "",
    precioActual: "",
    precioAnterior: "",
    imagen: "",
    alt: "",
    etiqueta: "",
    categoria: "",
    tallasDisponibles: "",
    stock: 0,
    caracteristicas: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userSession = JSON.parse(localStorage.getItem("userSession"));
    const token = localStorage.getItem("token");

    if (!userSession || userSession.role !== "admin") {
      alert("No tienes permisos para añadir productos.");
      setLoading(false);
      return;
    }

    const body = {
      ...formData,
      tallasDisponibles: formData.tallasDisponibles
        ? formData.tallasDisponibles.split(",").map((t) => t.trim())
        : [],
      caracteristicas: formData.caracteristicas
        ? formData.caracteristicas.split(",").map((c) => c.trim())
        : [],
    };

    try {
      const response = await fetch("http://localhost:3000/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const err = await response.json();
        alert(`Error: ${err.message}`);
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log("Producto agregado:", data);
      alert("Producto agregado correctamente");

      setFormData({
        nombre: "",
        descripcion: "",
        descripcionLarga: "",
        precioActual: "",
        precioAnterior: "",
        imagen: "",
        alt: "",
        etiqueta: "",
        categoria: "",
        tallasDisponibles: "",
        stock: 0,
        caracteristicas: "",
      });
    } catch (error) {
      console.error("Error al agregar producto:", error);
      alert("Error al conectarse con el servidor");
    }

    setLoading(false);
  };

  return (
    <div className="admin-layout">
      <NavAdmin />
      <div className="admin-container">
        <aside className="admin-sidebar">
          <h3>Panel de Administración</h3>
          <ul>
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/admin/productos">Gestión de Productos</Link></li>
            <li><Link to="/admin/usuarios">Gestión de Usuarios</Link></li>
            <li><Link to="/admin/pedidos">Pedidos</Link></li>
            <li><Link to="/admin/estadisticas">Estadísticas</Link></li>
            <li><Link to="/admin/configuracion">Configuración</Link></li>
          </ul>
        </aside>

        <main className="admin-main">
          <section className="admin-form-section">
            <h2>Añadir Nuevo Producto</h2>

            <form onSubmit={handleSubmit} className="producto-form">
              {[
                { label: "Nombre", name: "nombre", required: true },
                { label: "Descripción corta", name: "descripcion" },
                { label: "Descripción larga", name: "descripcionLarga", textarea: true },
                { label: "Precio actual", name: "precioActual", required: true },
                { label: "Precio anterior", name: "precioAnterior" },
                { label: "Imagen (URL)", name: "imagen", required: true },
                { label: "Alt (texto alternativo)", name: "alt" },
                { label: "Etiqueta", name: "etiqueta" },
                { label: "Categoría", name: "categoria", required: true },
                { label: "Tallas disponibles (separadas por coma)", name: "tallasDisponibles" },
                { label: "Stock", name: "stock", type: "number" },
                { label: "Características (separadas por coma)", name: "caracteristicas" },
              ].map((field) => (
                <div className="form-group" key={field.name}>
                  <label>{field.label}:</label>
                  {field.textarea ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      name={field.name}
                      type={field.type || "text"}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required || false}
                    />
                  )}
                </div>
              ))}

              <button type="submit" disabled={loading}>
                {loading ? "Agregando..." : "Añadir Producto"}
              </button>
            </form>

            <div className="back-link">
              <Link to="/admin">← Volver al Panel de Administración</Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminAgregarProducto;
