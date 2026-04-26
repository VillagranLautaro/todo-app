// routes/tasks.js
const express = require("express");
const router = express.Router();
const db = require("../database");

// GET — obtener todas las tareas
router.get("/", (req, res) => {
  db.all("SELECT * FROM tasks ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Error al obtener tareas" });
    res.json(rows);
  });
});

// POST — crear tarea
router.post("/", (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "El título es obligatorio" });
  }
  db.run("INSERT INTO tasks (title) VALUES (?)", [title.trim()], function (err) {
    if (err) return res.status(500).json({ error: "Error al crear tarea" });
    db.get("SELECT * FROM tasks WHERE id = ?", [this.lastID], (err, row) => {
      res.status(201).json(row);
    });
  });
});

// PATCH — marcar completada/pendiente
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  db.run(
    "UPDATE tasks SET completed = ? WHERE id = ?",
    [completed ? 1 : 0, id],
    function (err) {
      if (err) return res.status(500).json({ error: "Error al actualizar" });
      db.get("SELECT * FROM tasks WHERE id = ?", [id], (err, row) => {
        if (!row) return res.status(404).json({ error: "Tarea no encontrada" });
        res.json(row);
      });
    }
  );
});

// DELETE — eliminar tarea
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: "Error al eliminar" });
    res.status(204).send();
  });
});

module.exports = router;