const path = require('path')
const webpack = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const autoprefixer = require('autoprefixer')
const isDevelopment = process.env.NODE_ENV === 'development'

console.log('Running webpack in', process.env.NODE_ENV, 'mode')

const getStyleLoader = (isDev) => {
	const vueStyleLoader = {
		loader: 'vue-style-loader',
		options: {
			sourceMap: false,
			shadowMode: false,
			manualInject: true,
		},
	}

	return [
		isDev
			? vueStyleLoader
			: {
					loader: MiniCssExtractPlugin.loader,
					options: {},
				},
	]
}

const postCssLoader = [
	{
		loader: 'postcss-loader',
		options: {
			postcssOptions: {
				plugins: [['postcss-preset-env', autoprefixer]],
			},
		},
	},
]

module.exports = {
	output: {
		path: path.resolve(process.cwd(), 'dist'),
		filename: '[name].[contenthash:8].js',
		chunkFilename: '[name].[contenthash:8].js',
	},
	resolve: {
		alias: {
			'~': path.resolve(process.cwd()),
			'@': path.resolve('src'),
		},
		extensions: ['*', '.js', '.vue', '.json', '.ts', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.(js|ts)$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.(ts|tsx)?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
							appendTsSuffixTo: [/\.vue$/],
							happyPackMode: false,
						},
					},
				],
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					compilerOptions: {
						compatConfig: {
							MODE: 2,
						},
					},
				},
			},
			{
				test: /\.(svg|png|jpg|gif|webm|mp4)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[hash].[ext]',
					outputPath: 'assets',
				},
			},
			{
				test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
				loader: 'file-loader',
				options: {
					name: '[name][contenthash:8].[ext]',
				},
			},
			{
				test: /\.css$/i,
				oneOf: [
					{
						resourceQuery: /\?vue/,
						use: [
							...getStyleLoader(isDevelopment),
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 2,
								},
							},
							...postCssLoader,
						],
					},
					{
						test: /\.module\.\w+$/,
						use: [
							...getStyleLoader(isDevelopment),
							{
								loader: 'css-loader',
								options: {
									sourceMap: false,
									importLoaders: 2,
									modules: {
										localIdentName: '[name]_[local]_[hash:base64:5]',
									},
								},
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: false,
									...postCssLoader,
								},
							},
						],
					},
					{
						use: [...getStyleLoader(isDevelopment), 'css-loader', ...postCssLoader],
					},
				],
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		new CleanWebpackPlugin(),
		new CaseSensitivePathsPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash:8].css',
			chunkFilename: '[name].[contenthash:8].css',
		}),
		new webpack.DefinePlugin({
			__VUE_OPTIONS_API__: false,
			__VUE_PROD_DEVTOOLS__: false,
		}),
	],
	devServer: {
		historyApiFallback: true,
	},
}
