const {promiseResolveLater, promiseRejectLater} = require("./promise-then.js");

let   tempPromise             = {}                          ;
const mockedResolutionHandler = jest.fn(resolve => resolve) ;
const mockedRejectionHandler  = jest.fn(reject => reject)   ;



describe('Simple .then with a single handler', () => {
  test('Chaining a .then to handle resolved promise', () => (
    Promise.resolve('A resolved promise')
      .then(result => expect(result).toBe('A resolved promise'))
  ));
  test('Chaining a .then to handle rejected promise', () => (
    Promise.reject('A rejected promise')
      .then(null, result => expect(result).toBe('A rejected promise'))
  ));
});


describe('Conditional .then -', () => {
  test('- dealing with a resolved promise', () => (
    Promise.resolve('A resolved promise')
      .then(resolveValue => expect(resolveValue).toBe('A resolved promise'),
            rejectValue  => expect(rejectValue).toBe('A rejected promise'),
      )
  ));
  test('- dealing with a rejected promise', () => (
    Promise.reject('A rejected promise')
      .then(resolveValue => expect(resolveValue).toBe('A resolved promise'),
            rejectValue  => expect(rejectValue).toBe('A rejected promise'),
      )
  ));
});


describe('Passing a statement to .then, to see if it gets result implicitly', () => {
  test('Should log "Log from promise" to the console', () => (
    Promise.resolve('Log from promise')
      .then(console.log)
  ));
});


describe('.then will always return a promise', () => {test('(no test)', () => {})});


describe(".then's returned promise's details depend on the handler's return value:", () => {

  
  afterEach(() => { jest.clearAllMocks(); }) // Reset mock counters after each test
  
  
  describe('1. Normal return value becomes a promise resolved with that value:', () => {
    beforeEach(() => {
      Promise.resolve()
        .then(result => 'Returned Text')
        .then(mockedResolutionHandler, mockedRejectionHandler);
    });
    test("Promise should be in a resolved state - next .then's resolve handler triggered", () => {
      expect(mockedResolutionHandler.mock.calls.length).toBe(1);
      expect(mockedRejectionHandler.mock.calls.length).toBe(0);
    })
    test("Promise's resolve value should be same as .then handler's return value", () => {
      expect(mockedResolutionHandler.mock.results[0].value).toBe('Returned Text');
      expect(mockedResolutionHandler.mock.calls.length).toBe(1); // Testing afterEach statement
    })
  })


  describe("2. No return value becomes a resolved promise with 'undefined' value", () => {
    beforeEach(() => {
      Promise.resolve()
        .then(resolve => {})
        .then(mockedResolutionHandler, mockedRejectionHandler);
    });
    test("Promise should be in a resolved state - next .then's resolve handler triggered", () => {
      expect(mockedResolutionHandler.mock.calls.length).toBe(1);
      expect(mockedRejectionHandler.mock.calls.length).toBe(0);
    })
    test("Promise's resolve value should be undefined", () => {
      expect(mockedResolutionHandler.mock.results[0].value).toBe(undefined);
    })
  })


  describe("3. Error becomes a rejected promise with the thrown error as value", () => {
    beforeEach(() => {
      Promise.resolve()
        .then(resolve => {throw Error('A sample error')})
        .then(mockedResolutionHandler, mockedRejectionHandler);
    });
    test("Promise should be in a rejected state - next .then's rejection handler triggered", () => {
      expect(mockedResolutionHandler.mock.calls.length).toBe(0);
      expect(mockedRejectionHandler.mock.calls.length).toBe(1);
    })
    test("Promise's value is the error object", () => {
      expect(mockedRejectionHandler.mock.results[0].value).toEqual(Error('A sample error'));
    })
  })


  describe("4. Resolved promise and its value are basically mirrored", () => {
    beforeEach(() => {
      Promise.resolve()
        .then(resolve => Promise.resolve('An immediately resolved promise'))
        .then(mockedResolutionHandler, mockedRejectionHandler);
    })
    test("Promise should be in a resolved state - next .then's resolve handler triggered", () => {
      expect(mockedResolutionHandler.mock.calls.length).toBe(1);
      expect(mockedRejectionHandler.mock.calls.length).toBe(0);
    })
    test("Promise's value should be the returned promise's value", () => {
      expect(mockedResolutionHandler.mock.results[0].value).toBe('An immediately resolved promise');
    })
  })

  
  describe("5. Rejected promise and its value are basically mirrored", () => {
    beforeEach(() => {
      Promise.reject()
        .then(null, reject => Promise.reject('An immediately rejected promise'))
        .then(mockedResolutionHandler, mockedRejectionHandler);
    })
    test("Promise should be in a rejected state - next .then's rejection handler triggered", () => {
      expect(mockedResolutionHandler.mock.calls.length).toBe(0);
      expect(mockedRejectionHandler.mock.calls.length).toBe(1);
    })
    test("Promise's value should be the returned promise's value", () => {
      expect(mockedRejectionHandler.mock.results[0].value).toBe('An immediately rejected promise');
    })
  })


  describe("6. Pending promise's status and value are mirrored, and so is its transition", () => {

    describe("Testing immediate results:", () => {
      beforeEach(() => {
        Promise.resolve()
        .then(resolve => promiseResolveLater())
        .then(mockedResolutionHandler, mockedRejectionHandler)
        .then(result => {jest.clearAllMocks()}) // to clean up asynchronously
      })
      test('Neither of the handlers should be triggered immediately', () => {
        expect(mockedResolutionHandler.mock.calls.length).toBe(0);
        expect(mockedRejectionHandler.mock.calls.length).toBe(0);
      })
    })


    describe("Testing (after settling) for promise that transitions to resolved:", () => {
      
      test('Resolve handle should be triggered with correct value', () => (
        Promise.resolve()
        .then(resolve => promiseResolveLater())
        .then(mockedResolutionHandler, mockedRejectionHandler)
        .then(result => {
          expect(mockedResolutionHandler.mock.calls.length).toBe(1);
          expect(mockedRejectionHandler.mock.calls.length).toBe(0);
          expect(mockedResolutionHandler.mock.results[0].value).toBe('From resolve-later promise')
        })
        .then(result => {jest.clearAllMocks()}) // to clean up asynchronously
      ))

    })
    

    describe("Testing (after settling) for promise that transitions to rejected:", () => {
      
      test('Rejection handle should be triggered with correct value', () => (
        Promise.resolve()
        .then(resolve => promiseRejectLater())
        .then(mockedResolutionHandler, mockedRejectionHandler)
        .then(result => {
          expect(mockedResolutionHandler.mock.calls.length).toBe(0);
          expect(mockedRejectionHandler.mock.calls.length).toBe(1);
          expect(mockedRejectionHandler.mock.results[0].value).toBe('From reject-later promise')
        })
        .then(result => {jest.clearAllMocks()}) // to clean up asynchronously
      ))

    })

    
  })

})