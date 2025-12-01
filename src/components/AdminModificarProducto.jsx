// src/components/Admin/AdminModificarProducto.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import NavAdmin from "./NavAdmin";

const AdminModificarProducto = () => {
  const [buscarId, setBuscarId] = useState("");
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBuscar = async () => {
    if (!buscarId) {
      alert("Ingrese un ID para buscar");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/productos/${buscarId}`);
      if (!response.ok) {
        alert("Producto no encontrado");
        return;
      }
      const data = await response.json();

      // Convertimos arrays a strings separados por coma para el formulario
      setFormData({
        nombre: data.nombre || "",
        descripcion: data.descripcion || "",
        descripcionLarga: data.descripcionLarga || "",
        precioActual: data.precioActual || "",
        precioAnterior: data.precioAnterior || "",
        imagen: data.imagen || "",
        alt: data.alt || "",
        etiqueta: data.etiqueta || "",
        categoria: data.categoria || "",
        tallasDisponibles: data.tallasDisponibles ? data.tallasDisponibles.join(", ") : "",
        stock: data.stock || 0,
        caracteristicas: data.caracteristicas ? data.caracteristicas.join(", ") : "",
      });
    } catch (error) {
      console.error("Error al buscar producto:", error);
      alert("Error al conectarse con el servidor");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) return;

    setLoading(true);
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    const token = localStorage.getItem("token");

    if (!userSession || userSession.role !== "admin") {
      alert("No tienes permisos para modificar productos.");
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
      const response = await fetch(`http://localhost:3000/productos/${buscarId}`, {
        method: "PUT",
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
      console.log("Producto modificado:", data);
      alert("Producto modificado correctamente");
    } catch (error) {
      console.error("Error al modificar producto:", error);
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
            <h2>Modificar Producto</h2>

            {/* Buscar producto */}
            <div className="form-group">
              <label>ID del producto a modificar:</label>
              <div className="buscar-container">
                <input
                  type="text"
                  value={buscarId}
                  onChange={(e) => setBuscarId(e.target.value)}
                  placeholder="Ingrese ID"
                  disabled={formData !== null}
                />
                <button type="button" onClick={handleBuscar} disabled={formData !== null}>
                  Buscar
                </button>
              </div>
            </div>

            {/* Formulario */}
            {formData && (
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
                  {loading ? "Guardando..." : "Modificar Producto"}
                </button>
              </form>
            )}

            {formData && (
              <div className="back-link">
                <button
                  className="btn-cancel"
                  onClick={() => {
                    setFormData(null);
                    setBuscarId("");
                  }}
                >
                  Cancelar y Buscar Otro Producto
                </button>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminModificarProducto;
