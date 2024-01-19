const path = require('path')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const { dependencies: deps } = require('./package.json')
const { getRemoteEntry } = require('./config/webpack-utils')
const baseWebpackConfig = require('./config/webpack.config.base')

const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = webpackMerge.merge(baseWebpackConfig, {
	entry: {
		main: './src/main.ts',
	},
	output: {
		publicPath: 'auto',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './index.html'),
			favicon: './public/favicon.ico',
		}),
		new ModuleFederationPlugin({
			name: 'exposeApp',
			filename: 'remoteEntry.js',
			exposes: {
				'./ExposeAppComp.vue': './src/components/expose-app-comp/expose-app-comp.vue',
				'./YellowCar.vue': './src/components/yellow-car/yellow-car.vue',
			},
			remotes: {
				...getRemoteEntry('hostApp', isDevelopment),
			},
			shared: {
				...deps,
				vue: {
					eager: true,
					singleton: true,
					requiredVersion: deps['vue'],
				},
			},
		}),
	],
	devServer: {
		static: {
			directory: path.join(__dirname),
		},
		compress: true,
		port: 3002,
		hot: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
		},
	},
})
