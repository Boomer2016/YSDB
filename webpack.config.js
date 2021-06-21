const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const safeParser = require('postcss-safe-parser')
const pkg = require('./package.json')

const themeConfig = require(pkg.theme)

let commonPlugins = []
const theme = themeConfig()
const clientIsDev = process.env.NODE_ENV

module.exports = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  devServer: {
    compress: true,
    inline: true,
    hot: true,
    port: 8888,
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    // },
    historyApiFallback: true,
    noInfo: false,
    // proxy URLs to backend development server
    proxy: {
      '/doc/': {
        // target: 'http://121.43.233.147:93',
        target: 'https://cod.sics.ac.cn',
        changeOrigin: true,
      },
      '/web/': {
        // target: 'http://121.43.233.147:92',
        target: 'https://cod.sics.ac.cn',
        changeOrigin: true,
      },
      '/docfile/': {
        // target: 'http://121.43.233.147',
        target: 'https://cod.sics.ac.cn',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  entry: './src/index',
  output: {
    path: path.join(__dirname, 'dist/web'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/] || src\//,
          chunks: 'all',
          name: 'common',
          minSize: 0,
          minChunks: 2,
          enforce: true,
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          parser: safeParser,
          discardComments: {
            removeAll: true,
          },
        },
      }),
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader?cacheDirectory'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.styl$/,
        use: [clientIsDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'stylus-loader'],
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
      },
      // 引入bootstrap的样式后，单独处理css
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        use: [
          clientIsDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          `less-loader?{"sourceMap":true, "modifyVars":${JSON.stringify(theme)}, "javascriptEnabled": true}`,
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|woff|woff2|eot|ttf)$/,
        exclude: [path.resolve(__dirname, './src/icon')],
        use: [
          {
            loader: 'url-loader',
            query: {
              name: '[name].[hash:8].[ext]',
              limit: 1024 * 10,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: clientIsDev,
      __PRO__: !clientIsDev,
    }),
    new webpack.ProvidePlugin({
      lodash: '_',
      moment: 'moment',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      favicon: path.resolve('favicon.ico'),
    }),
  ],
}
if (process.env.NODE_ENV !== 'development') {
  // 线上环境
  commonPlugins = [
    new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css',
    }),
    // 复制public文件夹下的文件到dist/public目录下，copy-webpack-plugin的版本有限制的，目前工程下，不能为最新版，降级到6.x才行
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, 'asset'),
    //       to: path.resolve(__dirname, 'dist/web/asset'),
    //       toType: 'dir',
    //     },
    //     {
    //       from: path.resolve(__dirname, 'server/config.js'),
    //       to: path.resolve(__dirname, 'dist/config.js'),
    //       toType: 'file',
    //     },
    //   ],
    // }),
    /**
     * ! 一般不需要开启, 默认打包出来的 stats.json 文件会随着项目增大而变大
     *   如果发现项目中出现某些文件打包很大时, 执行 npm run build 之后执行 npm run analyzer 进行文件分析和打包优化
     */
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'disabled',
    //   generateStatsFile: true,
    // }),
  ]
  // module.exports.devtool = 'source-map'
} else {
  // 开发环境
  commonPlugins = [new webpack.HotModuleReplacementPlugin()]
  module.exports.devtool = 'cheap-module-eval-source-map'
}

module.exports.plugins = module.exports.plugins.concat(commonPlugins)
