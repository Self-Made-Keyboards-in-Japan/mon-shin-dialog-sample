const path = require('path');

module.exports = (env, argv) => ({
  // モードが production だと最適化された状態で、
  // development だとソースマップ有効でJSファイルが出力される

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: ['@babel/polyfill', './src/index.js', './src/closest.js' ],
  // ファイルの出力設定
  output: {
    // 出力ファイル名
    filename: 'bundle.js',
    //  出力ファイルのディレクトリ名
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/dist/",

  },
  //監視有効
  watch: true,
  //開発用サーバー
  devServer:{
    contentBase: path.resolve(__dirname, './'),
    watchContentBase: true,
    index: 'index.html',
    host: '0.0.0.0',
    //ポート指定
    port: 3000,
    open: true,
    openPage: "index.html",
    inline: true
  },

  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        // node_modulesは対象外にしておく
        exclude: /node_modules/,
        use: 
          {
            // Babel を利用する
            loader: 'babel-loader',
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES2019 を ES5 に変換
                '@babel/preset-env',
              ]
            }
          }
      },
      { // 拡張子 .glsl .vert .frag の場合
        test: /\.(glsl|vert|frag)$/,
        // webpack向けglsl-loaderを利用する
        loader: [ 'raw-loader', 'webpack-glsl-loader' ]
      }
    ]

  }
});