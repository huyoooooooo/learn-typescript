const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'main.js'
  },
  resolve: {
    // 自动解析文件后缀拓展
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    // 配置指定后缀名文件的处理
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  devtool: process.env.NODE_ENV === 'production' ? false: 'inline-source-map',
  devServer: {
    static: ['./dist'],    // 本地运行时基于的文件目录
    compress: false,
    host: 'localhost',
    port: 8089
  },
  stats: 'errors-only',
  optimization: {
    minimize: false,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['./dist']
    }),
    new HtmlWebpackPlugin({
      template: './src/template/index.html'
    })
  ]
}