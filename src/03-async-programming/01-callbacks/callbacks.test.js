// Too confusing. Dropping callbacks for now.


// In all working cases and those that make sense, we see the callback being
// set up inside the test, and done and expect being placed at a relevant point.

// The 'result' has to be passed to the point where 'expect' and 'done' are
// called.

// Doesn't seem reasonable to test pre-existing callback functions.

// You need to be in THE callback thread which matters, and put the 'expect'
// and 'done' statements there to be able to test that callback.

// Perhaps, if your asychronous function actually accepted a callback, and
// eventually triggered that callback - and that callback itself had
// the done and expect statements.

// describe('testing callbacks', () => {
//   test('a simple setTimeout', done => {
//     setTimeout(() => {
//       expect(1).toBe(1);
//       done();
//     }, 1000);
//   });
// });


// Start with promises
// Get to async await
// Then test callbacks... maybe sometime later?




// function addAsync(a, b, callback) {
//   setTimeout(() => {
//     const result = a + b;
//     callback(result);
//   }, 1000)
// }


// test('add numbers async', done => {
//   addAsync(10, 5, result => {
//     expect(result).toBe(15);
//     done();
//   })
// })

// function toArray(messageString, callback) {
//   setTimeout(() => {
//     const result = messageString.split(' ');
//     callback(result);
//   }, 1000)
// }


// test('string split', done => {
//     toArray('My string', result => {
//       expect(result).toEqual(['My', 'string']);
//       done();
//     })
// })


// describe('test asynchronous call', () => {
//   it('this should not pass', done => {
//     expect.assertions(1);
//     setTimeout(() => {
//       expect(1).toBe(2);
//       done();
//     });
//   });
// });