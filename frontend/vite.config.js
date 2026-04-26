// vite.config.js
// Configuración de Vite. Le decimos que use el plugin de React.
// También configuramos un "proxy" para que las llamadas a /api
// se redirijan automáticamente al backend en el puerto 3001.

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Cualquier request que empiece con /api se redirige al backend
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
