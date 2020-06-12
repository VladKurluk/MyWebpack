// Встроенные плагины и утилиты Node.js
const path = require("path");
// Установленные плагины для Webpack
const Webpack = require("webpack");
const WebpackMerge = require("webpack-merge");
// Ф-л с базовой конфигурацией Webpack
const baseWebpackConfig = require("./webpack.config");

// Настройки Webpack
module.exports = WebpackMerge(baseWebpackConfig, {
    mode: "development",
    // Дев сервер
    devServer: {
        port: 7700,
        overlay: {
            warnings: true, // Показывать предупреждения в браузере
            errors: true, // Показывать ошибки в браузере
        }
    },
    // Сорс мапы для исходного кода
    devtool: "eval-source-map",
    plugins: [
        new Webpack.SourceMapDevToolPlugin({
            filename: "[file].map",
        }),
    ],
});