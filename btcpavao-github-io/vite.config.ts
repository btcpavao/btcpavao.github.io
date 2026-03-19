import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { motionwind } from "motionwind-react/vite"
import type { Plugin } from "vite"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [motionwind() as unknown as Plugin, react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
