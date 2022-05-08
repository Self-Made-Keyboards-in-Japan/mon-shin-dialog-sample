// https://coinbaby8.com/javascriptes6-webpack-babel.html を基に設定
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => ({
  mode: 'production',
  // メインとなるJavaScriptファイル（エントリーポイント）
//   entry: ['@babel/polyfill', './src/js/index.js', './src/js/closest.js' ],
  entry: {
	  // '@babel/polyfill',
		index: './src/js/index.js',
		buildProblem: './src/js/buildProblem.js',
		firmwareProblem: './src/js/firmwareProblem.js'
	},
  // IE11 に対応させるために 'es5' でトランスパイルする
//   target: ['web', 'es5'],
  // IE11 対応を取りやめ 2022/05/05
  target: ['web'],
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/dist/",
  },
  // ソースマップの設定
  // [webpack-dev-server で Chrome DevTools にエラーが出る - Qiita](https://qiita.com/YoshinoriKanno/items/322ae6e53daa35059c15)
  devtool: 'eval-source-map',
  devServer:{
    static: {
      directory: path.resolve(__dirname, './dist'),
      watch: true,
    },
    host: '0.0.0.0',
    port: 3000,
    open: true,
    devMiddleware: {
      index: 'index.html',
      writeToDisk: true
    }
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'css', to: 'css' },
        // { from: '*.html' },
        { from: 'favicon.ico', to: 'image' },
        { from: 'image', to: 'image'}
      ]
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        use:
          {
            loader: 'babel-loader',
            options: {
              presets: [
                // プリセットを指定することで、ES2019 を ES5 に変換
                '@babel/preset-env',
              ]
            }
          }
      },
      {
        test: /\.css$/,
        // loaderを複数使用するときは use を使う
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            }
          }
        ]
	  }
    ]
  }
});