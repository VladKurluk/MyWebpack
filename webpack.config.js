// Встроенные плагины
const path = require("path");
// Установленные плагины
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const devMode = process.env.NODE_ENV === "development";
const prodMode = process.env.NODE_ENV === "production";

const optimization = () => {
    const config = {
        // Оптимизация при подключении одной JS библиотеки к нескольким файлам.
        splitChunks: {
            chunks: "all",
        },
    };

    if (prodMode) {
        // Минификация CSS и JS для продакшена
        config.minimizer = [new OptimizeCssAssetsPlugin(), new TerserPlugin()];
    }

    return config;
};

const filename = (ext) => (devMode ? `[name].${ext}` : `[name].[hash].${ext}`);

const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: devMode,
                reloadAll: true,
            },
        },
        "css-loader",
    ];

    if (extra) {
        loaders.push(extra);
    }

    return loaders;
};

module.exports = {
    // Режим работы
    mode: "development",
    // В поле context храниться абсолютный путь к папке с исходниками проекта
    context: path.resolve(__dirname, "src"),
    // Входные точки
    entry: {
        main: ["@babel/polyfill", "./index.js"],
        analytics: "./analytics.js",
    },
    // Результат работы сборщика
    // В [name] попадет ключи из объекта entry. Ф-лов будет ровно столько сколько ключей.
    // В [contenthash] уникальный хеш, который измениться при изменении содержимого ф-ла
    output: {
        filename: filename("js"),
        path: path.resolve(__dirname, "dist"),
    },
    // Дев сервер
    devServer: {
        port: 8005,
    },
    resolve: {
        // В этом поле указываться расширение ф-лов.
        // И при импортах можно не указывать занесенные сюда расширения
        extensions: [".js", ".scss", ".png"],
        // Алиасы для абсолютных путей к файлам проекта
        alias: {
            "@models": path.resolve(__dirname, "src/models"),
            "@": path.resolve(__dirname, "src"),
        },
    },
    optimization: optimization(),
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: prodMode,
            },
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            // Плагин для копирования статических ф-лов. Указываем откуда и куда нужно скопировать.
            patterns: [
                {
                    from: path.resolve(__dirname, "src/favicon.ico"),
                    to: path.resolve(__dirname, "dist"),
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: filename("css"),
        }),
    ],
    module: {
        // Лоадеры.
        // Нужно устанавливать для определенного типа фай-лов, по умолчанию Webpack понимает JS и JSON
        // Прописать расширение в поле test и имя лоадера в use
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/plugin-proposal-class-properties"],
                    },
                },
            },
            {
                test: /\.css$/,
                use: cssLoaders(),
            },
            {
                test: /\.s(c|a)ss$/,
                use: cssLoaders("sass-loader"),
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ["file-loader"],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ["file-loader"],
            },
            {
                test: /\.xml$/,
                use: ["xml-loader"],
            },
        ],
    },
};
