const { defineConfig } = require('@vue/cli-service')
module.exports = {
  transpileDependencies: [ "@splidejs" ],
  outputDir: 'target/dist',
  assetsDir: 'static',
  lintOnSave: false,
  devServer: {
    port: 5000,
    historyApiFallback: true,
    allowedHosts: "all",
    public: 'http://localhost:5000',
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
