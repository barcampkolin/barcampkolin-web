const path = require('path');
const webpack = require('webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const currentYear = '2025';

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production';

    return {
        mode: isProd ? 'production' : 'development',
        entry: {
            main: require.resolve('./assets/js/main.js'),
            admin: require.resolve('./assets/js/admin.js'),
        },
        output: {
            path: path.resolve(__dirname, 'www/static', currentYear),
            filename: 'js/[name].js'
        },
        optimization: {
            minimize: isProd,
            minimizer: ['...', new CssMinimizerPlugin()] // '...' means to use the default when others mismatch type
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: false
                            }
                        }
                    ]
                },
                {
                    test: /\.less$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                lessOptions: {
                                    modifyVars: {
                                        staticBase: JSON.stringify(`/static/${currentYear}`)
                                    },
                                    javascriptEnabled: true
                                }
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: path.dirname(require.resolve('bootstrap/package.json')) + '/fonts',
                        to: 'fonts/'
                    },
                    {
                        from: path.resolve(__dirname, 'assets/fonts/icomoon'),
                        to: `fonts/`
                    }
                ]
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].css'
            }),
            new webpack.DefinePlugin({
                currentYear: JSON.stringify(currentYear)
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
            }),

        ],
        resolve: {
            alias: {
                '@vendor': path.resolve(__dirname, 'vendor'),
            }
        },
        devtool: isProd ? false : 'source-map',
        watchOptions: {
            ignored: /node_modules/,
            aggregateTimeout: 200,
        }

    };
};
