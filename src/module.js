console.log('Module.js')

async function start() {
    Promise.resolve('It is promise')
}
start().then(console.log)