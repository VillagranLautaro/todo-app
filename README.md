# 📝 To-Do App — Fullstack

Una aplicación fullstack para gestionar tareas, construida con React, Node.js, Express y SQLite.

![Preview](https://via.placeholder.com/800x400?text=To-Do+App+Preview)

## ✨ Funcionalidades

- ✅ Ver lista de tareas
- ➕ Agregar nuevas tareas
- ☑️ Marcar tareas como completadas
- 🗑️ Eliminar tareas
- 📊 Contador de progreso

## 🛠️ Stack tecnológico

| Parte      | Tecnología                  |
|------------|-----------------------------|
| Frontend   | React 18 + Vite             |
| Backend    | Node.js + Express           |
| Base de datos | SQLite (better-sqlite3) |
| Estilos    | CSS puro con variables      |

## 🚀 Cómo correrlo localmente

### Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- npm (viene incluido con Node.js)

### 1. Cloná el repositorio

```bash
git clone https://github.com/TU_USUARIO/todo-app.git
cd todo-app
```

### 2. Instalá las dependencias del backend

```bash
cd backend
npm install
```

### 3. Instalá las dependencias del frontend

```bash
cd ../frontend
npm install
```

### 4. Corré el backend

Abrí una terminal y ejecutá:

```bash
cd backend
npm run dev
```

El servidor va a estar disponible en `http://localhost:3001`

### 5. Corré el frontend

Abrí **otra terminal** y ejecutá:

```bash
cd frontend
npm run dev
```

La app va a estar disponible en `http://localhost:5173`

> ⚠️ Necesitás tener **ambas terminales** corriendo al mismo tiempo.

## 📁 Estructura del proyecto

```
todo-app/
├── backend/
│   ├── routes/
│   │   └── tasks.js      # Endpoints de la API REST
│   ├── database.js       # Configuración de SQLite
│   ├── server.js         # Servidor Express
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx    # Formulario para agregar tareas
│   │   │   └── TaskItem.jsx    # Componente de tarea individual
│   │   ├── App.jsx             # Componente raíz + lógica
│   │   ├── App.css             # Estilos
│   │   └── main.jsx            # Punto de entrada de React
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

| Método   | Ruta              | Descripción                    |
|----------|-------------------|--------------------------------|
| `GET`    | `/api/tasks`      | Obtener todas las tareas       |
| `POST`   | `/api/tasks`      | Crear una nueva tarea          |
| `PATCH`  | `/api/tasks/:id`  | Marcar como completada/pendiente |
| `DELETE` | `/api/tasks/:id`  | Eliminar una tarea             |

## 👨‍💻 Autor

Hecho con ❤️ por **[Tu Nombre](https://github.com/TU_USUARIO)**

---

*Proyecto de portfolio — To-Do App Fullstack*
