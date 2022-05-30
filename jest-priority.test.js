const testObj = {count: 0};

beforeAll(() => {console.log('Before all tests, outside any describe')})
beforeEach(() => {console.log('Before each test, outside any describe')})

console.log('statement before describe 1');
test('test before describe 1', () => {console.log('test before describe 1')});

describe('describe 1 ->', () => {
  beforeAll(() => {console.log('Before all tests in describe 1')});
  beforeEach(() => {console.log('Before each test in describe 1')});
  console.log('statement at start of describe 1');
  test('describe 1 -> test 1', () => {console.log('describe 1 -> test 1')});
  test('describe 1 -> test 2', () => {console.log('describe 1 -> test 2')});
  console.log('statement at end of describe 1');
  afterAll(() => {console.log('After all tests in describe 1')});
  afterEach(() => {console.log('After each test in describe 1')});
});

test('test after describe 1', () => {console.log('test after describe 1')})
console.log('statement after describe 1');

console.log('statement before describe 2');
test('test before describe 2', () => {console.log('test before describe 2')});

describe('describe 2', () => {
  beforeAll(() => {console.log('Before all tests in describe 2')});
  beforeEach(() => {console.log('Before each test in describe 2')});
  console.log('statement at start of describe 2');
  test('describe 2 -> test 1', () => {console.log('describe 2 -> test 1')});
  test('describe 2 -> test 2', () => {console.log('describe 2 -> test 2')});
  console.log('statement at end of describe 2');
  afterAll(() => {console.log('After all tests in describe 2')});
  afterEach(() => {console.log('After each test in describe 2')});
})

afterAll(() => {console.log('After all tests, outside any describe')});
afterEach(() => {console.log('After each test, outside any describe')});

test('test after describe 2', () => {console.log('test after describe 2')})
console.log('statement after describe 2');


/*
  Summary:

  The tests are neatly piled in a different order in the results screen, but
  the console logs indicate a different story.

  According to the console logs:

  
    * All statements are collected first and executed sequentially, ignoring the
      nesting inside any describe blocks.


    * All tests are gathered together and executed sequentially, ignoring the
      nesting inside any describe blocks - but note that the before/after
      statements (setups and teardowns) will be applied on these tests in a
      specific order (see below).
    

    * The before and after statements are collected and applied, RESPECTING the
      describe block scope.
        
        Before all outside any describe block is executed before any tests, and
        is executed before the describe block's Before all.

        Before each outside any describe block is executed before each test, and
        is executed before the describe block's before each.

                          <test takes place here>
            
        After each outside any describe block is executed after each test, and
        is executed after the describe block's after each.
        
        After  all outside any describe block is executed after  all tests, and
        is executed after the describe block's after all.
*/