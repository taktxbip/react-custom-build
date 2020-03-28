const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



module.exports = (env = {}) => {

	const { mode = 'development'} = env;

	const isProd = mode === 'production';
	const isDev = mode === 'development';

	const getStyleLoaders = () => {
		return [
			isProd ? MiniCssExtractPlugin.loader : 'style-loader',
			'css-loader'
		]
	}

	const getPlugins = () => {
		const plugins = [
			new HtmlWebpackPlugin({
				title: 'Hello World',
				buildTime: new Date().toString(),
				template: 'public/index.html'
			})
		];
		if (isProd) {
			plugins.push(new MiniCssExtractPlugin({
				filename: 'main-[hash:8].css'
				})
			);
		}
		return plugins;
	};

	console.log(mode)
	return {
		mode: isProd ? 'production' : isDev && 'development',

		output: {
			filename: isProd ? 'main-[hash:8].js' : undefined
		},

		module: {
			rules: [

				// Loading JS
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},

				// Loading Images
				{
					test: /\.(png|jpe?g|gif|ico)$/,
					use: [{
						loader: 'file-loader',
						options: {
							outputPath: 'images',
							name: '[name]-[sha1:hash:7].[ext]'
						}
					}]
				},

				// Loading Fonts
				{
					test: /\.(ttf|otf|eot|woff|woff2)$/,
					use: [{
						loader: 'file-loader',
						options: {
							outputPath: 'fonts',
							name: '[name].[ext]'
						}
					}]
				},

				// Loading CSS
				{
					test: /\.(css)$/,
					use: getStyleLoaders()
				},

				// Loading SCSS
				{
					test: /\.(scss)$/,
					use: [ ...getStyleLoaders(), 'sass-loader']
				}
			]
		},

		plugins: getPlugins(),

		devServer: {
			open: true
		}
	};
};