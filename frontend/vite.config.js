// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite' // <-- Ajoute ceci

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(), // <-- Et ceci
//   ],
  
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    // 🔥 Force Vite à utiliser une instance UNIQUE de React pour tout le projet,
    // ce qui empêche Recharts de dupliquer les Hooks en tâche de fond.
    dedupe: ['react', 'react-dom'],
  },
})