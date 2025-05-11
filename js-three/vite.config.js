// vite.config.js
export default {
  build: {
    minify: 'esbuild',
    chunkSizeWarningLimit: 1400,  // in kilobytes (KB)
    emptyOutDir: false,
    lib: {
      entry: 'src/main.js',
      name: '3DViewer',
      fileName: '3DViewer',
      formats: ['es']  // ES module
    },
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: '3DViewer.js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name][extname]'
      }
    }
  }
}
