import * as $ from "jquery";
import Post from "@models/Post";
import "./styles/styles.css";
import "@/scss/main";
import WebpackLogo from "@/assets/webpack-logo.png";
import xml from "@/assets/example.xml";
import './forbabel'

const post = new Post("Webpack Start", WebpackLogo);
$("pre").addClass("code").html(post.toString());
console.log("Post to string", post.toString());
console.log("XML", xml);
