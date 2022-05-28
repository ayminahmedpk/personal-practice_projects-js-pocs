
const add = require('./mod-add.js');
const mul = require('./mod-mul-div.js').mul;
const div = require('./mod-mul-div.js').div;
const sub = require('./mod-sub.js');

module.exports = {
    add,
    sub,
    mul,
    div,
}