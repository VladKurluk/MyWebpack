// Ф-л с примером для демонстрации работы ES6+
async function start() {
  return Promise.resolve('async is working');
}

start().then(console.log);

class Test {
    static id = Date.now();
}

console.log('Test id:', Test.id);
