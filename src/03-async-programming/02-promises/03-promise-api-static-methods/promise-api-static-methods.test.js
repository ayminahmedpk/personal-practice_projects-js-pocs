
const mockedResolutionHandler = jest.fn(resolve => resolve);
const mockedRejectionHandler  = jest.fn(reject => reject);



describe("Static methods from the Promise API:", () => {


  describe('"1. Promise.all()"', () => {
    test('Resolves if all promises resolve...', () => (
      Promise.all([
        new Promise(resolve => setTimeout(() => resolve('0.1 second resolve'), 100)),
        new Promise(resolve => setTimeout(() => resolve('0.2 second resolve'), 200)),
        new Promise(resolve => setTimeout(() => resolve('0.3 second resolve'), 300)),
      ]).then(mockedResolutionHandler, mockedRejectionHandler)
        .then(result => {
          expect(mockedResolutionHandler.mock.calls.length).toBe(1);
          expect(mockedRejectionHandler.mock.calls.length).toBe(0);
          jest.clearAllMocks();
        })
    ));
    test("...and the value is set to an array of the resolved promises' values", () => (
      Promise.all([
        new Promise(resolve => setTimeout(() => resolve('0.1 second resolve'), 100)),
        new Promise(resolve => setTimeout(() => resolve('0.3 second resolve'), 300)),
        new Promise(resolve => setTimeout(() => resolve('0.2 second resolve'), 200)),
      ]).then(result => expect(result).toEqual([
        '0.1 second resolve'  ,
        '0.3 second resolve'  ,
        '0.2 second resolve' ,
      ]))
    ));
    test("Rejects immediately if any promise rejects...", () => (
      Promise.all([
        new Promise(resolve           => setTimeout(() => resolve('0.1 second resolve'), 100)),
        new Promise((resolve, reject) => setTimeout(() => reject( '0.2 second reject' ), 200)),
        new Promise(resolve           => setTimeout(() => resolve('0.3 second resolve'), 300)),
      ]).then(mockedResolutionHandler, mockedRejectionHandler)
        .then(result => {
          expect(mockedResolutionHandler.mock.calls.length).toBe(0);
          expect(mockedRejectionHandler.mock.calls.length).toBe(1);
          jest.clearAllMocks();
      })
    ));
    test("...and the value is set to the value of the rejected promise", () => (
      Promise.all([
        new Promise(resolve            => setTimeout(() => resolve('0.1 second resolve'), 100)),
        new Promise((resolve, reject)  => setTimeout(() => reject( '0.2 second reject' ), 200)),
        new Promise(resolve            => setTimeout(() => resolve('0.3 second resolve'), 300)),
      ]).then(null, result => expect(result).toEqual('0.2 second reject'))
    ))
  })


  describe("2. Promise.allSettled():", () => {
    test("Resolves when all promises settle (complete), regardless of their result", () => (
      Promise.allSettled([
        new Promise(resolve           => setTimeout(() => resolve('0.1 second resolve'), 100)),
        new Promise((resolve, reject) => setTimeout(() => reject( '0.2 second reject' ), 200)),
        new Promise(resolve           => setTimeout(() => resolve('0.3 second resolve'), 300)),
      ]).then(mockedResolutionHandler, mockedRejectionHandler)
        .then(result => {
          expect(mockedResolutionHandler.mock.calls.length).toBe(1);
          expect(mockedRejectionHandler.mock.calls.length).toBe(0);
          jest.clearAllMocks();
      })
    ));
    test("The promise' value is is an array of objects containing original promises' results and values", () => (
      Promise.allSettled([
        new Promise(resolve           => setTimeout(() => resolve('0.1 second resolve'), 100)),
        new Promise((resolve, reject) => setTimeout(() => reject( '0.2 second reject' ), 200)),
        new Promise(resolve           => setTimeout(() => resolve('0.3 second resolve'), 300)),
      ]).then(null, result => expect(result).toEqual([
        {status: "fulfilled", value : "0.1 second resolve"},
        {status: "rejected" , reason: "0.2 second reject" },
        {status: "fulfilled", value : "0.3 second resolve"},
      ]))
    ));
  });


  describe("3. Promise.any():", () => {
    test("(no test - not supported in this node) Resolves and reflects fastest resolving promise.", () => {});
    test("(no test - not supported in this node) If all reject, returns AggregateError with all errors.", () => {});
    // test("Resolves when the fastest promise resolves, reflects its value and ignores the rest", () => (
    // ('If all promises reject, rejects with a special AggregateError that holds all errors')
    //   Promise.any([
    //     new Promise((resolve, reject) => setTimeout(() => reject( '0.1 second reject' ), 100)),
    //     new Promise(resolve           => setTimeout(() => resolve('0.2 second resolve'), 200)),
    //     new Promise(resolve           => setTimeout(() => resolve('0.3 second resolve'), 300)),
    //   ]).then(mockedResolutionHandler, mockedRejectionHandler)
    //     .then(result => {
    //       expect(mockedResolutionHandler.mock.calls.length).toBe(1);
    //       expect(mockedRejectionHandler.mock.calls.length).toBe(0);
    //       expect(result).toBe('0.2 second resolve');
    //       jest.clearAllMocks();
    //   })
    // ));
  });


  describe("4. Promise.race():", () => {
    test("Settles when the fastest promise settles, and reflects its status/result ignores the rest", () => (
      Promise.race([
        new Promise((resolve, reject) => setTimeout(() => reject( '0.1 second reject' ), 100)),
        new Promise(resolve           => setTimeout(() => resolve('0.2 second resolve'), 200)),
        new Promise(resolve           => setTimeout(() => resolve('0.3 second resolve'), 300)),
      ]).then(mockedResolutionHandler, mockedRejectionHandler)
        .then(result => {
          expect(mockedResolutionHandler.mock.calls.length).toBe(0);
          expect(mockedRejectionHandler.mock.calls.length).toBe(1);
          expect(result).toBe('0.1 second reject');
          jest.clearAllMocks();
      })
    ));
  });

  
  describe("5 & 6. Promise.resolve(value) and Promise.reject(value) ", () =>{
    test('(no test) Returns a resolved (or rejected) promise, optionally with the given value', () => {})
  })


});
