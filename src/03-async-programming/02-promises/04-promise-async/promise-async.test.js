const {
  promiseResolveLater,
  promiseRejectLater
} = require("../02-promise-then/promise-then");

let resolveLater ;
let rejectLater  ;
let errorObject  ;


describe('Testing the async keyword', () => {
  beforeAll(async () => {
    resolveLater = await promiseResolveLater() ;
    try {
      rejectLater  = await promiseRejectLater() ;
    } catch (error) {
      errorObject = error;
    }
  })
  test("Await pauses code and returns resolved promise's value", () => {
    expect(resolveLater).toBe('From resolve-later promise');
  });
  test("Await can't deal with rejection, treats as an error, throws value (must be caught)", () => {
    expect(errorObject).toBe('From reject-later promise');
  });
})