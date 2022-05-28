

const firstHello  = require('./modules/firstHello.js').firstHello;
const secondHello = require('./modules/secondHello.js').secondHello;

const moreHellos    = require('./modules/third fourth hello.js');
const thirdHello    = moreHellos.thirdHello;
const {fourthHello} = moreHellos;

console.log('main module loaded');

firstHello();
secondHello();

thirdHello();
fourthHello();