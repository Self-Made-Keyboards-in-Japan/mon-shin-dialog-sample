// https://coinbaby8.com/javascriptes6-webpack-babel.html を基に設定
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => ({
  mode: 'production',
  entry: {
		common: './src/js/common.js',
		buildProblem: './src/js/buildProblem.js',
		firmwareProblem: './src/js/firmwareProblem.js'
	},
  // IE11 対応を取りやめ 2022/05/05
  target: ['web'],
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/dist/",
		clean: true,
  },
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: 'initial',
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
				},
			}
		}
	},
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
        { from: 'favicon.ico', to: 'image' },
        { from: 'image', to: 'image'}
      ]
    }),
		new BundleAnalyzerPlugin({
			analyzerMode: 'static'
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
                '@babel/preset-env',
              ]
            }
          }
      },
      {
        test: /\.css$/,
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