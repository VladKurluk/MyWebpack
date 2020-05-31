import "@/css/index";
import "@/scss/index";
// import * as $ from "jquery";
import Post from "@/js/models/Post";
import WebpackLogo from "@/assets/webpack-logo.png";
import '@/js/forbabel'

const post = new Post("Webpack Start", WebpackLogo);
// $("pre").addClass("code").html(post.toString());
document.querySelector('pre').innerHTML = post.toString()
document.querySelector('pre').classList.add('code')
console.log("Post to string", post.toString());

let add = (a, b) => a + b
console.log(add(2, 3))