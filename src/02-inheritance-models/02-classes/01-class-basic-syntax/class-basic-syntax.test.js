class Student {
  constructor(name) {
    this.name = name;
    this.boundSayHi = this.sayHi.bind(this);
  }
  sayHi() {return `Hi! I'm a student named ${this?.name}.`;} // because JEST is weird with the global object
  major = "Programming";
  static className = 'Student';
  static getClassName() {return `Class is ${this.className}`;}
  arrowHi = () => (`I am always bound to myself, name is ${this.name}.`);
};

let john = new Student('John');

const studentVanillaSayHi = john.sayHi;
const studentBoundSayHi   = john.boundSayHi;
const studentArrowHi      = john.arrowHi;


describe('Confirming that class basic syntax worked', () => {
  test('Parameters initialized properly', () => {
    expect(john.name).toBe('John');
  })
  test('Methods working properly', () => {
    expect(john.sayHi()).toBe("Hi! I'm a student named John.");
  })
})


describe ('Confirming class implementation via prototype', () => {
  
  test('Student class becomes a function', () => {
    expect(typeof(Student)).toBe('function');
  })

  test("Class methods become properties of constructor function's prototype property", () => {
    expect(Student.prototype).toHaveProperty('sayHi');
    expect(typeof(Student.prototype.sayHi)).toBe('function');
  })

  test("Class fields are written directly to the instantiated object, not constructor", () => {
    expect(Student).not.toHaveProperty('major');
    expect(Student.prototype).not.toHaveProperty('major');
    expect(john).toHaveProperty('major');
  })

  test('Static properties and methods become properties of the constructorFunction', () => {
    expect(Student).toHaveProperty('className');
    expect(Student).toHaveProperty('getClassName');
    expect(typeof(Student.getClassName)).toBe('function');
  })
});


describe('Testing some methods to bind class functions to their objects', () => {
  
  test('Binding can be done in the constructor', () => {
    expect(studentVanillaSayHi()).toBe("Hi! I'm a student named undefined.");
    expect(studentBoundSayHi()).toBe("Hi! I'm a student named John.");
  })

  test("Arrow functions are automagically bound, as their 'this' is lexical", () => {
    expect(studentArrowHi()).toBe(`I am always bound to myself, name is John.`)
  })
})

describe('Classes are more than just syntactic sugar on prototypes:', () => {

  test('1. Class methods are set to non-enumerable in constructorFunction.prototype', () => {
    expect(Object.getOwnPropertyDescriptors(Student.prototype).sayHi.enumerable).
    toBe(false);
    // console.log(Object.getOwnPropertyDescriptors(Student));
    // expect(Object.getOwnPropertyDescriptors(Student.prototype)).
    // toBe(false);
  })

  test('2. (No test) Classes set [[IsClassConstructor]] to true, which is not accessible by code', () => {})
  test('3. (No test) Classes are guaranteed to use strict', () => {})

})