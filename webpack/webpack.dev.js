const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../src'),
      publicPath: '/'
    },
    historyApiFallback: true,
    hot: 'only',
    open: true,
    host: 'localhost',
    port: '4444',
    compress: true
  },
}
