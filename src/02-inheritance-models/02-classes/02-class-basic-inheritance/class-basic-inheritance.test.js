class GrandParent {
  constructor(name) {
    this.name = name;
  }
  
  greet() {return `Our family is pleased to meet you.`} // Method (normal)
  
  familyName = 'Johnson'; // Class Field (normal)
  
  sayHi() {return `Hi! I'm grandpa. My name is ${this.name}.`;} // Method to override
  
  static location = "Down South by the Lake"; // Static property
  static showMessage() {return 'We live in peace.';} // Static method
}

class Parent extends GrandParent {
  constructor(name) {
    super(name);
  }
  sayHi() {return `Hi! I'm dad. My name is ${this.name}.`;}
}

class Son extends Parent {
  sayHi() {return `Hi! I'm son. My name is ${this.name}.`;}
}

const alex = new GrandParent('Alex');
const brad = new Parent('Brad');
const carl = new Son('Carl');



describe('Confirm that class inheritance worked', () => {
  test('Confirm constructors worked properly (and default created when not given)', () => {
    expect(alex.name).toBe('Alex');
    expect(brad.name).toBe('Brad');
    expect(carl.name).toBe('Carl');
  })
  test('Confirm method inheritance working properly', () => {
    expect(alex.greet()).toBe('Our family is pleased to meet you.');
    expect(brad.greet()).toBe('Our family is pleased to meet you.');
    expect(carl.greet()).toBe('Our family is pleased to meet you.');
  })
  test('Confirm class fields inherited properly', () => {
    expect(alex.familyName).toBe('Johnson');  
    expect(brad.familyName).toBe('Johnson');  
    expect(carl.familyName).toBe('Johnson');  
  })
  test('Confirm methods overriding working properly', () => {
    expect(alex.sayHi()).toBe(`Hi! I'm grandpa. My name is Alex.`)
    expect(brad.sayHi()).toBe(`Hi! I'm dad. My name is Brad.`)
    expect(carl.sayHi()).toBe(`Hi! I'm son. My name is Carl.`)
  })
  test('Confirm static fields are saved on classes and inherited properly', () => {
    expect(GrandParent.location).toBe('Down South by the Lake');
    expect(Parent.location).toBe('Down South by the Lake');
    expect(Son.location).toBe('Down South by the Lake');
  })
  test('Confirm static methods are called on classes and inherited properly', () => {
    expect(GrandParent.showMessage()).toBe('We live in peace.');
    expect(Parent.showMessage()).toBe('We live in peace.');
    expect(Son.showMessage()).toBe('We live in peace.');
  })
})


describe('Inspecting implementation:', () => {
  test(`Basic inheritance: ChildConstructor.prototype.__proto__ set to ParentConstructor.prototype`, () => {
    expect(Son.prototype.__proto__).toBe(Parent.prototype);
    expect(Parent.prototype.__proto__).toBe(GrandParent.prototype);
  })
  test('Static inheritance: ChildConstructor.__proto__ set to ParentConstructor', () => {
    expect(Son.__proto__).toBe(Parent);
    expect(Parent.__proto__).toBe(GrandParent);
  })
})

describe('Class inheritance is also more than just syntactic sugar on prototypes:', () => {
  test(`1. (No test) No constructor? Defaults to 'constructor(...args) { super(...args) }'`, () => {});
  test(`2. (No test) [[ConstructorKind]]: "derived" set on constructors created by 'extends'`, () => {})
  test(`3. (No test) [[HomeObject]] added to class/object methods, affects methods with 'super'`, () => {})
  test(`For '1' and '2', see Bug 1 - Class fields bug. For '3', see Bug 2 - [[HomeObject]].`, () => {})
})