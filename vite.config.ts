import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Tailwind v4 roda como plugin do Vite (sem postcss.config).
// O plugin do React habilita Fast Refresh + JSX automático.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
