const { defineConfig } = require('@vue/cli-service')
module.exports = {
  transpileDependencies: [ "@splidejs" ],
  outputDir: 'target/dist',
  assetsDir: 'static',
  lintOnSave: false,
  devServer: {
    port: 8080,
    allowedHosts: "all",
    historyApiFallback: true,
    public: 'http://localhost:8080',
    proxy: {
      "/api": {
        target: "https://port-0-flask22-754g42aluyx17vx.sel5.cloudtype.app/",
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
