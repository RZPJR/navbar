module.exports = {
  productionSourceMap: true,
  lintOnSave: false,
  configureWebpack: {
    mode: 'production',
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      disableHostCheck: true,
      sockPort: 8501,
      sockHost: "localhost",
      // https: true,
      port: 8501,
    },
    externals: ["vue", "vue-router", /^@vue-mf\/.+/],
  },
  filenameHashing: false,
};
