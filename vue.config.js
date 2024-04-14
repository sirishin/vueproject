const { defineConfig } = require('@vue/cli-service')
module.exports = {
  transpileDependencies: [ "@splidejs" ],
  outputDir: 'target/dist',
  assetsDir: 'static',
  lintOnSave: false,
  devServer: {
    port: 8080,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api/",
        },
      },
    },
  },
}
