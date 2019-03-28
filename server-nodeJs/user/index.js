

let db = require('../db');
db.connect()
function User(name) {
  this.name = name;
}

User.prototype.hello = function (who) {
  console.log(db.getPharse("Hello") + ", " + who.name)
};

let kirill = new User('кириолл');
kirill.hello('кирилл');
module.exports = User;
