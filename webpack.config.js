var Path = require("path");

module.exports = {
    entry: "./build/index.js",
    output: {
        path: Path.resolve("./public"),
        filename: "bundle.js",
        sourceMapFilename: "bundle.map"
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'css-loader',
            'style-loader'
          ]
        }
      ]
    },
    devtool: "source-map"
};
