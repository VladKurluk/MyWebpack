async function start() {
    return await Promise.resolve("async is working");
}

start().then(console.log);

class Test {
    static id = Date.now();
}

console.log("Test id:", Test.id);
