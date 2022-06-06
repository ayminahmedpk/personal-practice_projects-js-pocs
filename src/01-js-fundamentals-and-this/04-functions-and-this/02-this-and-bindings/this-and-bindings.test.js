const bob = {
  name: "Bob",
  greet() {return `Hi! My name is ${this.name}`},
}

const steve = {
  name: "Steve",
  taunt() {return `Don't talk to me. I'm ${this.name}`},
}

const freeGreet   = bob.greet;
steve.forcedGreet = freeGreet;
const boundGreet  = freeGreet.bind(steve);




test('Dot notation works normally (Implicit binding)', () => {
  expect(bob.greet()).toBe('Hi! My name is Bob');
})

test('Copied function with new dot notation works in that context (Implicit binding)', () => {
  expect(steve.forcedGreet()).toBe('Hi! My name is Steve');
})

test('Function.call can be used to temporarily change context (Explicit binding)', () => {
  expect(steve.taunt.call(bob)).toBe(`Don't talk to me. I'm Bob`);
})

test('Function.apply is practically similar to Function.call (Explicit binding)', () => {
  expect(steve.taunt.apply(bob)).toBe(`Don't talk to me. I'm Bob`);
})

test('Bounded functions can be used to set a different context (Explicit binding)', () => {
  expect(boundGreet()).toBe('Hi! My name is Steve');
})

test("New binding is just instantiating a constructor function - skip testing", () => {})

// Note: Global object in JEST must be set inside package.json, not this file
// Since this test runs without a global "name" variable, "name" is undefined
test(`Call without implicit, explicit or constructor binding points to global object`, () => {
  expect(freeGreet()).toBe('Hi! My name is undefined');
})

test("(No test) - [[HomeObject]] bindings exist, only affect class/object\
 methods using 'super'. Priority unknown.", () => {})

// Global object in JEST is set in package.json,
// when it has a name variable set, then that variable is used; eg - if 'Mike',
// test(`Call without implicit, explicit or constructor binding points to global object`, () => {
//   expect(freeGreet()).toBe('Hi! My name is Mike');
// })