
// const add = require('./mod-add.js');
// const sub = require('./mod-sub.js');

// // Multiple imports
// const div = require('./mod-mul-div.js').div;
// const mul = require('./mod-mul-div.js').mul;

// Secondary syntax which also works for multiple imports
// const mulDiv = require('./mod-mul-div.js');
// const mul = mulDiv.mul;
// const div = mulDiv.div;

const {add, sub, mul, div} = require('./arithmetic.js');

test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
});


test('subtracts 4 from 10 to equal 6', () => {
    expect(sub(10,4)).toBe(6);
});


test('multiplies 3 and 4 to equal 12', () => {
    expect(mul(3,4)).toBe(12);
});


test('divides 20 by 5 to equal 4', () => {
    expect(div(20,5)).toBe(4);
});