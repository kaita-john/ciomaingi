import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
/*
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


{
  "homepage": "https://kaita-john.github.io/ciomaingi/",
  "name": "candleapp",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "dependencies": {
    "axios": "^1.7.9",
    "bootstrap": "^5.3.6",
    "firebase": "^11.3.1",
    "gh-pages": "^6.3.0",
    "jquery": "^3.7.1",
    "jquery-zoom": "^1.7.21",
    "nouislider": "^15.8.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.2.0",
    "slick-carousel": "^1.8.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.19.0",
    "@types/react": "^19.0.8",
    "@types/react-dom": "^19.0.3",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.19.0",
    "eslint-plugin-react": "^7.37.4",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.18",
    "globals": "^15.14.0",
    "vite": "^6.1.0"
  }
}

*/




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
    base: '/', // Matches GitHub Pages path
    build: {
        outDir: 'dist', // Ensure output directory is dist
    },
});