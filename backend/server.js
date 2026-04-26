// server.js
// Punto de entrada del backend. Acá arrancamos Express y conectamos todo.

const express = require("express");
const cors = require("cors");
const tasksRouter = require("./routes/tasks");

const app = express();
const PORT = 3001; // El frontend de Vite usa el 5173, así que usamos otro puerto

// ── Middlewares ────────────────────────────────
// cors() permite que el frontend (en otro puerto) pueda hacer requests al backend
app.use(cors());

// express.json() permite leer el cuerpo de las requests en formato JSON
app.use(express.json());

// ── Rutas ──────────────────────────────────────
// Todas las rutas de tasks van bajo el prefijo /api/tasks
app.use("/api/tasks", tasksRouter);

// Ruta de prueba para verificar que el servidor está corriendo
app.get("/", (req, res) => {
  res.json({ message: "✅ API de To-Do App funcionando correctamente" });
});

// ── Iniciar servidor ───────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
