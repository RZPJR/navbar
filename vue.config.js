module.exports = {
  // "transpileDependencies": [
  //   "vuetify"
  // ],
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      disableHostCheck: true,
      sockPort: 8501,
      sockHost: "localhost"
    },
    // module: {
    //   rules: [
    //     {
    //       test: /\.vue$/,
    //       use: ["vue-loader"],
    //     },
    //     {
    //       test: /\.scss$/,
    //       exclude: /node_modules/,
    //       use: [
    //           {
    //               loader: 'style-loader',
    //           },
    //           {
    //               loader: 'css-loader',
    //               options: {
    //                   sourceMap: true,
    //               },
    //           },
    //           {
    //               loader: 'sass-loader',
    //               options: {
    //                   sourceMap: true,
    //               },
    //           },
    //       ],
    //     }
    //   ],
    // },
    externals: ["vue", "vue-router", /^@vue-mf\/.+/]
  },
  filenameHashing: false
};

