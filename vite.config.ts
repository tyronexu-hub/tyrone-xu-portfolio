import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { sites } from "./build/sites-vite-plugin";

export default defineConfig({
  plugins: [react(), sites()],
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
});
