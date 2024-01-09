const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'index.js',
    globalObject: 'this',
    library: {
      name: '@siemens/common-ui',
      type: 'umd',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]', 
        },
      },
      {
        test: /\.svg$/,
        loader: '@svgr/webpack',
        options: {
          exportType :'named'
        }
      },
    ],
  },
};
