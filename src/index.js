// Подключение CSS
import "@/assets/css/index";
// Подключение SCSS
import "@/assets/scss/index";

// Код для примера, удалить при работе
// Импорт модели поста
import Post from "@/js/models/Post";
// Импорт ф-ла с кодом ES6
import '@/js/forbabel'
import Vue from 'vue'
import store from '@/store/index'
import App from '@/components/App.vue'
import count from '@/components/Counter'


const post = new Post("Webpack Start");
document.querySelector('pre').innerHTML = post.toString()
document.querySelector('pre').classList.add('code')


let add = (a, b) => a + b
console.log(add(2, 3))


new Vue({
    el: '#app',
    components: {
        App,
        count
    },
    store
    // render: h => h(App)
})
// .$mount('#app')