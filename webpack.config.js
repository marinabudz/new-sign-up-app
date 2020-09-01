const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: "babel-loader"
      },
      {
        test: /\.(s[ca]ss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(svg|png|pdf|jpg|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
              name: "[name]-[sha1:hash:8].[ext]"
            }
          }
        ]
      },

      {
        test: /\.(ttf|otf|eot|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "fonts",
              name: "[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: "index.html" })],
  devServer: {
    port: 3000
  }
};
