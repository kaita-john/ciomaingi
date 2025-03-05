import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    server: {
        allowedHosts: [
            '*',
            '4383-41-215-50-90.ngrok-free.app', // Add your ngrok host here
            'localhost', // Keep localhost if needed
            '127.0.0.1', // Keep this for local development
        ],
    },
    plugins: [react()],
})
