// src/main.jsx
// Punto de entrada de React. Monta el componente App en el div#root del HTML.

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode ayuda a detectar problemas en desarrollo (no afecta producción)
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
