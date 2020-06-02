// Встроенные плагины и утилиты Node.js
const path = require("path");
// Установленные плагины для Webpack
const WebpackMerge = require("webpack-merge");
// Ф-л с базовой конфигурацией Webpack
const baseWebpackConfig = require("./webpack.config");
//
module.exports = WebpackMerge(baseWebpackConfig, {
    mode: "production",
    // Удаление сорс мапов в продпкшен сборке
    devtool: "",
});