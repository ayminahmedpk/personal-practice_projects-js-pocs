// With 'this'
let grandParent = {
  name: "Grandpa",
  greet() { return `Hi! I'm ${this.name}.` }
};

let parent = {
  __proto__: grandParent,
  name: "Dad",
  greet() { this.__proto__.greet.call(this); }
};

let child = {
  __proto__: parent,
  name: "Son",
  greet() { this.__proto__.greet.call(this); }
};


// Without 'this', but with 'super' (JS uses [[HomeObject]] behind the scenes)
// With 'this'
let grandParent2 = {
  name: "Grandpa",
  greet() { return `Hi! I'm ${this.name}.`; }
};

let parent2 = {
  __proto__: grandParent2,
  name: "Dad",
  greet() { return super.greet(); }
};

let child2 = {
  __proto__: parent2,
  name: "Son",
  greet() { return super.greet(); }
};

describe("Recreating the infinite loop error with 'this' and '__proto__':", () => {
  test(`Child object call with bounded 'this' should not succeed`, () => {
    expect(() => {child.greet()}).toThrow(RangeError);
  })
})

describe("Recreating the scenario without 'this' - using super instead", () => {
  test(`Child object call without bounded 'this' should succeed (JS uses [[HomeObject behind the scenes]])`, () => {
    expect(child2.greet()).toBe(`Hi! I'm Son.`);
  })
  test('View the accompanying summary for an explanation.', () => {});
})