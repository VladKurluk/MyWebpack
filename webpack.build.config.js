// Встроенные плагины и утилиты Node.js
const path = require("path");
// Установленные плагины для Webpack
const WebpackMerge = require("webpack-merge");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WebpackBundleAnalayzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// Ф-л с базовой конфигурацией Webpack
const baseWebpackConfig = require("./webpack.config");

// Настройки Webpack
module.exports = WebpackMerge(baseWebpackConfig, {
    mode: "production",
    // Удаление сорс мапов в продпкшен сборке
    devtool: "",
    optimization: {
        minimizer: [
            // Сжатие CSS и JS на продакшен
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ]
    },
    plugins: [
        // Анализ размера бандлов
        new WebpackBundleAnalayzer()
    ]
});