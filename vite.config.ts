import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('frontend.key'),
      cert: fs.readFileSync('frontend.cert'),
    },
    host: 'localhost',
    port: 5173,  // or any port you prefer
  },
});
