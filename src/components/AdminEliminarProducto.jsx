// src/components/Admin/AdminEliminarProducto.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import NavAdmin from "./NavAdmin";

const AdminEliminarProducto = () => {
  const [buscarId, setBuscarId] = useState("");
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const userSession = JSON.parse(localStorage.getItem("userSession"));

  if (!userSession || userSession.role !== "admin") {
    alert("No tienes permisos para acceder a esta sección.");
    return null;
  }

  const handleBuscar = async () => {
    if (!buscarId) {
      alert("Ingrese un ID válido");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/productos/${buscarId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const err = await response.json();
        alert(`Error: ${err.message}`);
        setProducto(null);
        setLoading(false);
        return;
      }

      const data = await response.json();
      setProducto(data);
    } catch (error) {
      console.error("Error al buscar producto:", error);
      alert("Error al conectarse con el servidor");
      setProducto(null);
    }
    setLoading(false);
  };

  const handleEliminar = async () => {
    if (!producto) return;
    const confirmar = window.confirm(`¿Seguro que quieres eliminar "${producto.nombre}"?`);
    if (!confirmar) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/productos/${producto.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const err = await response.json();
        alert(`Error: ${err.message}`);
        setLoading(false);
        return;
      }

      alert(`Producto "${producto.nombre}" eliminado correctamente`);
      setProducto(null);
      setBuscarId("");
    } catch (error) {
      console.error("Error al eliminar producto:", error);
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
            <h2>Eliminar Producto</h2>

            {/* Búsqueda */}
            <div className="producto-form">
              <div className="form-group">
                <label>ID del producto:</label>
                <input
                  type="text"
                  name="buscarId"
                  value={buscarId}
                  onChange={(e) => setBuscarId(e.target.value)}
                />
              </div>
              <button onClick={handleBuscar} disabled={loading}>
                {loading ? "Buscando..." : "Buscar"}
              </button>
            </div>

            {/* Producto encontrado */}
            {producto && (
              <div className="producto-form">
                <h3>Producto encontrado</h3>
                <p><strong>ID:</strong> {producto.id}</p>
                <p><strong>Nombre:</strong> {producto.nombre}</p>
                <p><strong>Descripción:</strong> {producto.descripcion}</p>
                <p><strong>Precio:</strong> {producto.precioActual}</p>
                <p><strong>Categoría:</strong> {producto.categoria}</p>
                <p><strong>Stock:</strong> {producto.stock}</p>

                <button onClick={handleEliminar} disabled={loading}>
                  {loading ? "Eliminando..." : "Eliminar Producto"}
                </button>
              </div>
            )}

            <div className="back-link">
              <Link to="/admin">← Volver al Panel de Administración</Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminEliminarProducto;
