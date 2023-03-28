import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import config from './resource/config';

export default defineConfig(() => ({
    server: {
        proxy: {
            [config.api.applicant.url]: {
                target: config.backendServer.sdev.url,
                changeOrigin: true,
            },
            [config.api.labels.url]: {
                target: config.backendServer.sdev.url,
                changeOrigin: true,
            },
            [config.api.location.url]: {
                target: config.backendServer.sdev.url,
                changeOrigin: true,
            },
            [config.api.userInfo.url]: {
                target: config.backendServer.sdev.url,
                changeOrigin: true,
            },
            [config.api.autocomplete.url]: {
                target: config.backendServer.sdev.url,
                changeOrigin: true,
            },
        },
    },
    plugins: [vue()],
    build: {
        outDir: './build/dist/public',
    },
}));
