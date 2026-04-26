// src/components/TaskItem.jsx

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      {/* Checkbox personalizado */}
      <label className="task-checkbox-wrap" aria-label="Marcar como completada">
        <input
          type="checkbox"
          checked={Boolean(task.completed)}
          onChange={() => onToggle(task.id, !task.completed)}
        />
        <span className="checkmark">
          {/* Tilde SVG que aparece cuando está marcada */}
          <svg viewBox="0 0 11 11" fill="none">
            <path d="M1.5 5.5l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </label>

      {/* Contenido */}
      <div className="task-content">
        <span className="task-title">{task.title}</span>
      </div>

      {/* Botón eliminar */}
      <button
        className="btn-delete"
        onClick={() => onDelete(task.id)}
        aria-label="Eliminar tarea"
      >
        <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 3.5h10M5.5 3.5V2.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1M6 6v4M8 6v4M3 3.5l.7 7a.5.5 0 00.5.5h5.6a.5.5 0 00.5-.5l.7-7" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </button>
    </li>
  );
}

export default TaskItem;
