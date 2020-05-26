import Post from './Post'
import './styles/styles.css'
import WebpackLogo from './assets/webpack-logo.png'

const post = new Post('Webpack Start', WebpackLogo)
console.log('Post to string', post.toString())
