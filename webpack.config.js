// Встроенные плагины
const path = require('path')
// Установленные плагины
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
  // Режим работы
  mode: 'development',
  // В поле context храниться абсолютный путь к папке с исходниками проекта
  context: path.resolve(__dirname, 'src'),
  // Входные точки
  entry: {
    main: './index.js',
    analytics: './analytics.js'
  },
  // Результат работы сборщика
  // В [name] попадет ключи из объекта entry. Ф-лов будет ровно столько сколько ключей.
  // В [contenthash] уникальный хеш, который измениться при изменении содержимого ф-ла
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    // В этом поле указываться расширение ф-лов. 
    // И при импортах можно не указывать занесенные сюда расширения
    extensions: ['.js', '.png'],
    // Алиасы для абсолютных путей к файлам проекта
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: {
    // Оптимизация при подключении одной JS библиотеки к нескольким файлам.
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      }
    ]
  }
}