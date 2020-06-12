// Подключение CSS
import '@/assets/css/index';
// Подключение SCSS
import '@/assets/scss/index';

// Код для примера, удалить при работе
// Импорт модели поста
import Post from '@/js/models/Post';
// Импорт ф-ла с кодом ES6
import '@/js/forbabel';

const post = new Post('Webpack Start');
document.querySelector('pre').innerHTML = post.toString();
document.querySelector('pre').classList.add('code');

const add = (a, b) => a + b;
console.log(add(2, 3));
console.log(window);

function test() {
    console.log('Test');
}

test();
