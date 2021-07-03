// https://coinbaby8.com/javascriptes6-webpack-babel.html を基に設定
const path = require('path');

module.exports = (env, argv) => ({
  mode: 'production',
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: ['@babel/polyfill', './src/index.js', './src/closest.js' ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/dist/",
  },
  // ソースマップの設定
  // [webpack-dev-server で Chrome DevTools にエラーが出る - Qiita](https://qiita.com/YoshinoriKanno/items/322ae6e53daa35059c15)
  devtool: 'eval-source-map',
  //監視有効
  //watch: true, -> webpack-cli のアップデート（3.x.x -> 4.x.x）によりこのオプションは不要となる
  //開発用サーバー
  devServer:{
    contentBase: path.resolve(__dirname, './'),
    watchContentBase: true,
    index: 'index.html',
    host: '0.0.0.0',
    port: 3000,
    open: true,
    openPage: "index.html",
    inline: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        // dark-mode-switch をバンドルするため node_modules を除外しない。
        use: 
        // exclude: /node_modules/,
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
        // dark-mode-switch の CSS をバンドルするため node_modules を除外しない。
        // exclude: /node_modules/,
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