// src/App.jsx — Componente raíz con lógica y filtros

import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";

const API_URL = "/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // "all" | "pending" | "completed"
  const [filter, setFilter] = useState("all");

  useEffect(() => { fetchTasks(); }, []);

  async function fetchTasks() {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error al cargar las tareas");
      setTasks(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function addTask(title) {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error("Error al crear la tarea");
      const newTask = await res.json();
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) { setError(err.message); }
  }

  async function toggleTask(id, completed) {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });
      if (!res.ok) throw new Error("Error al actualizar");
      const updated = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) { setError(err.message); }
  }

  async function deleteTask(id) {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar");
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) { setError(err.message); }
  }

  const completed = tasks.filter((t) => t.completed).length;
  const total = tasks.length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Filtrar tareas según el filtro activo
  const visibleTasks = tasks.filter((t) => {
    if (filter === "pending") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-top">
          <div className="header-icon">
            <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1.5" y="1.5" width="15" height="15" rx="3" stroke="white" strokeWidth="1.5"/>
              <path d="M5.5 9l2.5 2.5 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="app-title">Mis tareas</h1>
        </div>

        {/* Barra de progreso */}
        {total > 0 && (
          <>
            <div className="progress-wrap">
              <div className="progress-fill" style={{ width: `${percent}%` }} />
            </div>
            <p className="progress-label">{percent}% completado — {completed} de {total}</p>
          </>
        )}
      </header>

      {/* ── Stats ── */}
      {total > 0 && (
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-number">{total}</div>
            <div className="stat-label">Total</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{total - completed}</div>
            <div className="stat-label">Pendientes</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{completed}</div>
            <div className="stat-label">Completadas</div>
          </div>
        </div>
      )}

      {/* ── Formulario ── */}
      <TaskForm onAdd={addTask} />

      {/* ── Filtros ── */}
      <div className="filters">
        {[["all", "Todas"], ["pending", "Pendientes"], ["completed", "Completadas"]].map(
          ([val, label]) => (
            <button
              key={val}
              className={`filter-chip ${filter === val ? "active" : ""}`}
              onClick={() => setFilter(val)}
            >
              {label}
            </button>
          )
        )}
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="error-banner">
          ⚠️ {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {/* ── Lista ── */}
      {loading && <p className="loading-text">Cargando tareas...</p>}

      {!loading && visibleTasks.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            {filter === "completed" ? "🎉" : filter === "pending" ? "✅" : "📋"}
          </div>
          <p>
            {filter === "completed"
              ? "No completaste tareas todavía."
              : filter === "pending"
              ? "No tenés tareas pendientes."
              : "¡Agregá tu primera tarea!"}
          </p>
        </div>
      )}

      <ul className="task-list">
        {visibleTasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
        ))}
      </ul>
    </div>
  );
}

export default App;
