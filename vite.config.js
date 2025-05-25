import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    server: {
        allowedHosts: [
            '*',
            '4383-41-215-50-90.ngrok-free.app',
            'b46d-41-215-50-90.ngrok-free.app',
            'localhost',
            '127.0.0.1',
        ],
    },
    plugins: [react()],
    base: '/ciomaingi', // Matches GitHub Pages path
    build: {
        outDir: 'dist', // Ensure output directory is dist
    },
});