

const {promiseResolveLater, promiseRejectLater} = require('./promise-constructor.js');


describe('Creating simple promises:', () => {
  
  test('Creating a promise that resolves in 1 second', () => (
    new Promise(
      resolve => setTimeout(() => resolve('Simple resolved promise'), 500)
    ).then(result => expect(result).toBe('Simple resolved promise'))
  ))

  test('Creating a promise that rejects in 1 second', () => (
    new Promise(
      (resolve, reject) => setTimeout(() => reject('Simple rejected promise'), 500)
    ).then(null, result => expect(result).toBe('Simple rejected promise'))
  ))
})


describe('Returning a promise from a function', () => {

  test('Retrurnig a promise that resolves later', () => (
    promiseResolveLater().then(result => expect(result).toBe('From resolve-later promise'))
  ))

  test('Returning a promise that rejects later', () => (
    promiseRejectLater().then(null, result => expect(result).toBe('From reject-later promise'))
  ))
  
})


describe('Advanced techniques:', () => (

  test('Passing a promise to the resolveFunction call', () => (
    new Promise(
      resolve => setTimeout(() => {
        resolve(new Promise(
          innerResolve => setTimeout(() => {
            innerResolve('Nested promise resolving in 0.5 seconds')
          }, 500))
      )}, 500)
    ).then(result => expect(result).toBe('Nested promise resolving in 0.5 seconds'))
  ))
  
));