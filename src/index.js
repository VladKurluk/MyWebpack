import "@/css/index";
import "@/scss/index";
// import * as $ from "jquery";
import Post from "@/js/models/Post";
import WebpackLogo from "@/assets/img/webpack-logo.png";
import '@/js/forbabel'
import Vue from 'vue'
import App from '@/components/App.vue'
import count from '@/components/Counter'


const post = new Post("Webpack Start", WebpackLogo);
// $("pre").addClass("code").html(post.toString());
document.querySelector('pre').innerHTML = post.toString()
document.querySelector('pre').classList.add('code')
console.log("Post to string", post.toString());

let add = (a, b) => a + b
console.log(add(2, 3))


new Vue({
    el: '#app',
    components: {
        App,
        count
    },
    // render: h => h(App)
})
// .$mount('#app')