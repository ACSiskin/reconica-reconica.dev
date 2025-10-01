import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// UWAGA: jeśli to Project Pages (np. user.github.io/repo-name), ustaw base:
export default defineConfig({
  plugins: [react()],
  base: '/<NAZWA_REPO>/', // <- podmień; dla user/org pages usuń tę linię
})
