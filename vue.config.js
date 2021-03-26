const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const DotEnv = require('dotenv-webpack')
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    configureWebpack: {
        plugins: [
            new MonacoWebpackPlugin({
                languages: [
                    'shell', 'c', 'cs', 'cpp', 'go', 'java', 'javascript',
                    'kotlin', 'lua', 'pascal', 'php', 'python', 'r', 'ruby',
                    'rust', 'sql', 'swift', 'typescript', 'vb',
                ],
            }),
            new DotEnv(),
            //new BundleAnalyzerPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.ya?ml$/,
                    type: 'json',
                    use: 'yaml-loader',
                },
                {
                    test: /\.pug$/,
                    loader: 'pug-plain-loader',
                },

            ],
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    vendor: {
                        test: /[\\/](monaco-editor)[\\/]/,
                        name: 'monaco-editor',
                    },
                },
            },
        },
    },
}