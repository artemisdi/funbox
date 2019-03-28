let user = require('./user');
let pack = require('./db/ru')

function run() {
  let kirill = new user.User('Кирилл');
}

if(module.parent) {
  run();
} else {
  console.log('qwe')
}

run();
