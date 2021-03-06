// Встроенные плагины и утилиты Node.js
const path = require("path");
// Установленные плагины для Webpack
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


// Переменные для динамического поведения конфига в зависимости от режима работы сборки
const devMode = process.env.NODE_ENV === "development";
const prodMode = process.env.NODE_ENV === "production";

// Глобальная переменная с путями до папок
const PATHS = {
    src: path.join(__dirname, "./src"),
    dist: path.join(__dirname, "./dist"),
    static: "static/",
};

/*
 * Функция формирующая названия файлов (js, css) для разных режимов
 * В [name] попадет ключи из объекта entry. Ф-лов будет ровно столько сколько ключей.
 * В [contenthash] уникальный хеш, который измениться при изменении содержимого ф-ла
 */
const filename = (ext) =>
    devMode ? `[name].[contenthash].${ext}` : `${ext}/[name].[hash].${ext}`;

const cssLoaders = (extra) => {
    const loaders = [
        "style-loader",
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: devMode,
                reloadAll: true,
                sourceMap: true,
            },
        },
        {
            loader: "css-loader",
            options: {
                sourceMap: true,
            },
        },
    ];

    if (extra) {
        loaders.push({
            loader: "postcss-loader",
            options: {
                sourceMap: true,
                config: {
                    path: path.resolve(__dirname, "./postcss.config.js"),
                },
            },
        });
        loaders.push({
            loader: extra,
            options: {
                sourceMap: true,
            },
        });
    } else {
        loaders.push({
            loader: "postcss-loader",
            options: {
                sourceMap: true,
                config: {
                    path: path.resolve(__dirname, "./postcss.config.js"),
                },
            },
        });
    }

    return loaders;
};

const jsLoaders = () => {
    const loaders = [{
        loader: "babel-loader",
        options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
        },
    }, ];

    if (devMode) {
        loaders.push("eslint-loader");
    }

    return loaders;
};

const plugins = () => {
    const basePlugins = [
        new HTMLWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: prodMode,
                removeComments: true,
            },
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            // Плагин для копирования статических ф-лов. Указываем откуда и куда нужно скопировать.
            patterns: [{
                    from: `${PATHS.src}/static/favicon.ico`,
                    to: `${PATHS.dist}`,
                },
                {
                    // При подключении картинок путь нужно указывать '/static/img/....'
                    from: `${PATHS.src}/assets/img`,
                    to: `${PATHS.static}img`
                },
                {
                    // При подключении шрифтов путь нужно указывать '/static/fonts....'
                    from: `${PATHS.src}/assets/fonts`,
                    to: `${PATHS.static}fonts`,
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: filename("css"),
        }),
    ];

    return basePlugins;
};

module.exports = {
    // В поле context храниться абсолютный путь к папке с исходниками проекта
    context: path.resolve(__dirname, "src"),
    // Через externals можно получить доступ к PATHS из других конфигов
    externals: {
        paths: PATHS,
    },
    // Входные точки
    entry: {
        main: ["@babel/polyfill", "./index.js"],
        analytics: "./analytics.js",
    },
    // Результат работы сборщика. Выходная точка
    output: {
        filename: filename("js"),
        path: PATHS.dist,
        publicPath: "/",
    },
    resolve: {
        // В этом поле указываться расширение ф-лов.
        // И при импортах можно не указывать занесенные сюда расширения
        extensions: [".js", ".css", ".scss", ".png"],
        // Алиасы для абсолютных путей к файлам проекта
        alias: {
            "@models": path.resolve(__dirname, "src/models"),
            "@": path.resolve(__dirname, "src"),
        },
    },
    optimization: {
        // Оптимизация при подключении одной JS библиотеки к нескольким файлам.
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendors',
                    chunks: "all",
                    enforce: true
                }
            }
        },
    },
    plugins: plugins(),
    module: {
        // Лоадеры.
        // Нужно устанавливать для определенного типа фай-лов, по умолчанию Webpack понимает JS и JSON
        // Прописать расширение в поле test и имя лоадера в use
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders(),
            },
            {
                test: /\.css$/,
                use: cssLoaders(),
            },
            {
                // scss
                test: /\.s(c|a)ss$/,
                use: cssLoaders("sass-loader"),
            },
            /* {
                // Обработка и сжатие картинок
                // TODO: Пока не работает, нужно разобраться
                test: /\.(png|jpg|svg|gif|webp)$/,
                use: [{
                        loader: "file-loader",
                        options: {
                            name: `${PATHS.static}img/[name].[ext]`
                        },
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.9],
                                speed: 4,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75,
                            },
                        },
                    }
                ]
            }, */
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ["file-loader"],
            },
        ],
    },
};