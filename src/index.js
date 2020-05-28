import * as $ from 'jquery'
import Post from '@models/Post'
import './styles/styles.css'
import WebpackLogo from '@/assets/webpack-logo.png'
import xml from '@/assets/example.xml'

const post = new Post('Webpack Start', WebpackLogo)
$('pre').html(post.toString())
console.log('Post to string', post.toString())
console.log('XML', xml)