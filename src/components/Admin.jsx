import { useState } from 'react';
import { Link } from 'react-router-dom';
import '/src/App.css';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  // Datos de ejemplo para las estadísticas
  const statsData = {
    totalProductos: 125,
    totalUsuarios: 458,
    pedidosMes: 42,
    ingresosMes: '$2.450.000'
  };

  // Actividad reciente
  const actividadReciente = [
    {
      id: 1,
      tipo: 'pedido',
      descripcion: 'Nuevo pedido #00458 - Cliente: Juan Pérez',
      tiempo: 'Hace 15 minutos'
    },
    {
      id: 2,
      tipo: 'producto',
      descripcion: 'Producto agregado - Camiseta Edición 2024',
      tiempo: 'Hace 2 horas'
    },
    {
      id: 3,
      tipo: 'usuario',
      descripcion: 'Usuario registrado - maria.gonzalez@email.com',
      tiempo: 'Hace 5 horas'
    },
    {
      id: 4,
      tipo: 'stock',
      descripcion: 'Stock actualizado - Figura Arturo Vidal (Quedan 15 unidades)',
      tiempo: 'Ayer'
    }
  ];

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h3>Panel de Administración</h3>
        <ul>
          <li>
            <Link 
              to="/admin" 
              className={activeSection === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveSection('dashboard')}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/productos" 
              className={activeSection === 'productos' ? 'active' : ''}
              onClick={() => setActiveSection('productos')}
            >
              Gestión de Productos
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/usuarios" 
              className={activeSection === 'usuarios' ? 'active' : ''}
              onClick={() => setActiveSection('usuarios')}
            >
              Gestión de Usuarios
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/pedidos" 
              className={activeSection === 'pedidos' ? 'active' : ''}
              onClick={() => setActiveSection('pedidos')}
            >
              Pedidos
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/estadisticas" 
              className={activeSection === 'estadisticas' ? 'active' : ''}
              onClick={() => setActiveSection('estadisticas')}
            >
              Estadísticas
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/configuracion" 
              className={activeSection === 'configuracion' ? 'active' : ''}
              onClick={() => setActiveSection('configuracion')}
            >
              Configuración
            </Link>
          </li>
        </ul>
      </aside>

      {/* Contenido principal */}
      <main className="admin-main">
        <h1>Dashboard de Administración</h1>
        
        {/* Tarjetas de estadísticas */}
        <section className="stats-cards">
          <div className="stat-card">
            <h3>Total de Productos</h3>
            <p className="stat-number">{statsData.totalProductos}</p>
            <Link to="/admin/productos">Ver todos</Link>
          </div>
          
          <div className="stat-card">
            <h3>Total de Usuarios</h3>
            <p className="stat-number">{statsData.totalUsuarios}</p>
            <Link to="/admin/usuarios">Ver todos</Link>
          </div>
          
          <div className="stat-card">
            <h3>Pedidos del Mes</h3>
            <p className="stat-number">{statsData.pedidosMes}</p>
            <Link to="/admin/pedidos">Ver pedidos</Link>
          </div>
          
          <div className="stat-card">
            <h3>Ingresos del Mes</h3>
            <p className="stat-number">{statsData.ingresosMes}</p>
            <Link to="/admin/estadisticas">Ver detalles</Link>
          </div>
        </section>

        {/* Actividad reciente */}
        <section className="recent-activity">
          <h2>Actividad Reciente</h2>
          <div className="activity-list">
            {actividadReciente.map(actividad => (
              <div key={actividad.id} className="activity-item">
                <p><strong>{actividad.descripcion.split(' - ')[0]}</strong> - {actividad.descripcion.split(' - ')[1]}</p>
                <span className="activity-time">{actividad.tiempo}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Acciones rápidas */}
        <section className="quick-actions">
          <h2>Acciones Rápidas</h2>
          <div className="action-buttons">
            <Link to="/admin/productos/nuevo" className="action-btn">
              Añadir Producto
            </Link>
            <Link to="/admin/productos/editar" className="action-btn">
              Modificar Producto
            </Link>
            <Link to="/admin/productos/eliminar" className="action-btn">
              Eliminar Producto
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPanel;