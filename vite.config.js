import { defineConfig } from 'vite'
import path from 'path';
import vituum from 'vituum'
// import tailwindcss from '@vituum/vite-plugin-tailwindcss'
import tailwindcss from '@tailwindcss/vite'
// import { postcss } from "@tailwindcss/postcss";
import postcss from "postcss";
// import postcss from '@vituum/vite-plugin-postcss'
import handlebars from '@vituum/vite-plugin-handlebars'
import fs from 'fs/promises';

const headFix = () => ({
    name: "assets-fix",
    transformIndexHtml(html) {
        html = html.replace(/\s+crossorigin/g, '');
        html = html.replace(/\/assets\//g, 'assets/');
        if (process.env.NODE_ENV === 'production') {
            html = html.replace(/fetch\(['"`]\.\/src\/data\/data\.json['"`]\)/g, 'fetch("assets/data.json")');
            html = html.replace(/url=["'`](\/src\/partials\/components\/)([^"']+)\.hbs["'`]/g, 'url="components/$2.html"');
            html = html.replace(/<link\s+rel=["']stylesheet["']\s+href=["']\/src\/style\/([^"']+)["']>/g, '<link rel="stylesheet" href="../assets/style/$1">');
        }
        return html;
    },
})

const moveDataToDist = () => ({
    name: 'move-json-to-dist', // Özel plugin
    closeBundle: async () => {
        const source = path.resolve(__dirname, 'src/data/data.json');
        const destination = path.resolve(__dirname, 'dist/assets/data.json');
        try {
            await fs.mkdir(path.dirname(destination), { recursive: true }); // Hedef dizini oluştur
            await fs.copyFile(source, destination); // Dosyayı taşı
        } catch (error) {
            console.error('data.json taşınırken bir hata oluştu:', error);
        }
    },
})

const moveComponentsToDist = () => ({
    name: "move-components-to-dist",
    closeBundle: async () => {
        const sourceDir = path.resolve(__dirname, 'src/partials/components');
        const destinationDir = path.resolve(__dirname, 'dist/components');

        try {
            // Kaynak dizindeki dosyaları listele
            const files = await fs.readdir(sourceDir);

            // Hedef dizini oluştur
            await fs.mkdir(destinationDir, { recursive: true });

            // Her bir dosyayı hedef dizine taşı
            for (const file of files) {
                const sourcePath = path.join(sourceDir, file);
                const destinationPath = path.join(destinationDir, file.replace('.hbs', '.html'));

                // Dosyayı kopyala
                await fs.copyFile(sourcePath, destinationPath);

                // Eğer dosya bir HTML dosyasıysa, düzenle
                if (destinationPath.endsWith('.html')) {
                    let content = await fs.readFile(destinationPath, 'utf8');

                    // <link> href yollarını düzenle
                    content = content.replace(/<link\s+rel=["']stylesheet["']\s+href=["']\/src\/style\/([^"']+)["']>/g, '<link rel="stylesheet" href="assets/style/$1">');

                    // <style> @import ifadelerini düzenle
                    content = content.replace(/@import\s+url\(["']src\/style\/([^"']+)["']\)/g, '@import url("assets/style/$1")');

                    // Dosyayı tekrar yaz
                    await fs.writeFile(destinationPath, content, 'utf8');
                }
            }

            console.log('Tüm dosyalar başarıyla taşındı ve düzenlendi!');
        } catch (error) {
            console.error('Dosyalar taşınırken bir hata oluştu:', error);
        }
    },
});

export default defineConfig({
    plugins: [
        vituum({
            input: ['./src/style/*.{css,pcss,scss,sass,less,styl,stylus}', './src/script/*.{js,ts,mjs}'],
        }),
        tailwindcss(),
        postcss(),
        handlebars({
            root: "./src",
            helpers: {
                'resolve-from-root': (relativePath) => path.join('/src', relativePath),
                'uppercase': (text) => text.toUpperCase(),
                'lowercase': (text) => text.toLowerCase(),
                'capitalize': (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
                'add': (a, b) => a + b,
                'subtract': (a, b) => a - b,
                'join': (array, separator) => Array.isArray(array) ? array.join(separator) : '',
                'length': (value) => value.length,
                'formatDate': (date, format) => {
                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                    return new Date(date).toLocaleDateString('tr-TR', options);
                },
                'debug': (value) => {
                    console.log(value);
                    return '';
                }
            },
        }),
        headFix(), moveDataToDist(), moveComponentsToDist()],
    server: {
        host: "0.0.0.0"
    },
    css: {
        devSourcemap: true,
    },
    build: {
        emptyOutDir: true,
        modulePreload: {
            polyfill: false,
        },
        legalComments: "none",
        rollupOptions: {
            output: {
                chunkFileNames: 'assets/script/[name].js',
                entryFileNames: 'assets/script/[name].js',
                assetFileNames: 'assets/style/[name][extname]',
            },
        },
    },
})