export default class Post {
  constructor(title, image) {
    this.title = title
    this.image = image
    this.date = new Date()
  }

  toString() {
    return JSON.stringify({
      title: this.title,
      image: this.image,
      date: this.date.toJSON()
    }, null, 4)
  }

  get uppercaseTitle() {
    return this.title.toUpperCase()
  }
}