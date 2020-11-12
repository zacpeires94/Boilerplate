module.exports = {
    entry: ["@babel/polyfill", "./client/index.js"],
    mode: "development",
    output: {
      path: __dirname,
      filename: "./public/bundle.js"
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader"
        },
        // {
        //   test: /\.png$/,
        //   loader: 'file-loader?name=media/[name].[ext]',
        // },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
      ]
    }
  };