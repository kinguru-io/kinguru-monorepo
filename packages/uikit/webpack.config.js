const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const KumaUIWebpackPlugin = require("@kuma-ui/webpack-plugin").default;

module.exports = {
	entry: "./src/index.tsx",
	mode: "production",
	target: "web",
	experiments: {
		outputModule: true
	},
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "lib"),
		libraryTarget: "module"
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /(node_module|lib)/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: [
								"@babel/preset-env",
								"@babel/preset-typescript",
								[
									"@babel/preset-react",
									{
										runtime: "automatic",
									},
								],
							],
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					"css-loader",
				],
			},
		],
	},
	resolve: {
		extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: "kuma.css" }),
		new KumaUIWebpackPlugin({}),
	]
};