import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';
import vituum from 'vituum';
import imports from 'vituum/plugins/imports.js';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

export default defineConfig({
    // server: {
    //     watch: {
    //         usePolling: true,
    //     },
    //     hmr: true,
    // },
    plugins: [
        Inspect(),
        imports(),
        vituum({
            imports: {
                filenamePattern: {
                    '+.css': [],
                    '+.scss': 'src/styles',
                },
            },
        }),
        createSvgIconsPlugin({
            // Specify the icon folder to be cached
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
            // Specify symbolId format
            symbolId: 'icon-[name]',
            customDomId: '__svg__icons__dom__',
        }),

        // Custom HMR
        {
            name: 'custom-hmr',
            enforce: 'post',
            handleHotUpdate({ file, server }) {
                if (file.endsWith('.html')) {
                    server.ws.send({
                        type: 'full-reload',
                        path: '*',
                    });
                }
            },
        },
    ],

    build: {
        assetsDir: 'assets',
        rollupOptions: {
            output: {
                // Настройка шаблона именования для ассетов
                assetFileNames: assetInfo => {
                    if (assetInfo.name.endsWith('.css')) {
                        return 'assets/css/[name][extname]';
                    } else if (
                        assetInfo.name.endsWith('.jpg') ||
                        assetInfo.name.endsWith('.png') ||
                        assetInfo.name.endsWith('.webp') ||
                        assetInfo.name.endsWith('.svg')
                    ) {
                        return 'assets/img/[name][extname]';
                    } else {
                        return 'assets/[name][extname]';
                    }
                },
                // Настройка шаблона именования для точек входа JS
                entryFileNames: 'assets/js/[name].[hash].js',
                // Настройка шаблона именования для чанков JS
                chunkFileNames: 'assets/js/[name].[hash].js',
            },
        },
    },
});
