// src/components/TaskForm.jsx

import { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setTitle("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="Agregar nueva tarea..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={200}
      />
      <button type="submit" className="btn-add" disabled={!title.trim()}>
        + Agregar
      </button>
    </form>
  );
}

export default TaskForm;
