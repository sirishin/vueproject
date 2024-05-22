const { defineConfig } = require('@vue/cli-service')
module.exports = {
  transpileDependencies: [ "@splidejs" ],
  outputDir: 'target/dist',
  assetsDir: 'static',
  lintOnSave: false,
  devServer: {
    // port: 8080,
    allowedHosts: "all",
    disableHostCheck: true,
    historyApiFallback: true,
    // public: 'http://localhost:8080',
    proxy: {
      "/api": {
        target: process.env.VUE_APP_API_BASE_URL,
        ws: true,
        withCredentials: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api/",
        },
      },
    },
  },
}
