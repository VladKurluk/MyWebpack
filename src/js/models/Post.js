// Модель поста для примера
export default class Post {
  constructor(title) {
    this.title = title
    this.date = new Date()
  }

  toString() {
    return JSON.stringify({
      title: this.title,
      date: this.date.toJSON()
    }, null, 4)
  }

  get uppercaseTitle() {
    return this.title.toUpperCase()
  }
}
