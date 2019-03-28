
let pharses;
exports.connect = function () {
  pharses = require('./ru')
};

exports.getPharse = function (name) {
  if(!pharses[name]) {
    throw new Error("нет такой фразы: " + name);
  }else {
    return pharses[name];
  }
};
