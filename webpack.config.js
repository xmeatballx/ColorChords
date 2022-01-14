module.exports = {
  entry: [
    "./src/js/app.js",
    "./src/js/renderlist.mjs",
    "./src/js/pubsub.mjs",
    "./src/js/state.mjs",
    "./src/js/eventhandler.mjs",
    "./src/js/piano.mjs",
  ],
  output: {
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2015", "stage-2"],
          },
        },
      },
    ],
  },
  mode: "production",
  performance: { hints: false },
  devServer: {
    static: {
      directory: "./dist",
    },
    compress: true,
    port: 8080,
  },
};
