const constructorMessage = "I was called with 'new', and must return an object."
const normalCallMessage  = "I was called without new, and can return anything."

const standardObject = {firstName: 'John', lastName: 'Doe'};
const specialObject  = {fullName: 'James Smith'};

function ConstructorFunction() {
  this.firstName = "John";
  this.lastName  = "Doe";
}

function ConstructorFunctionReturningPrimitive() {
  this.firstName = "John";
  this.lastName  = "Doe";
  return (this.firstName + ' ' + this.lastName);
}

function ConstructorFunctionReturningObject() {
  this.firstName = "John";
  this.lastName  = "Doe";
  return {fullName: 'James Smith'}
}

function SelfAwareFunction () {
  if(new.target) {
    return {message: "I was called with 'new', and must return an object."}
  }
  return "I was called without new, and can return anything.";
}

function FlexibleFunction(name) {
  if(new.target) {
    this.name = name;
    this.sayHi = `Hi from object! My name is ${this.name}.`;
  }
  else {
    return `Hi from primitive! My name is ${name}.`
  }
}


test('Constructor function returns a new object' , () => {
  expect(new ConstructorFunction()).toEqual(standardObject);
});

test(`Constructor function returning an object ignores other 'this' statements`, () => {
  expect(new ConstructorFunctionReturningObject()).toEqual(specialObject);
})

test('Constructor function returning a primitive ignores the return statement', () => {
  expect(new ConstructorFunctionReturningPrimitive()).toEqual(standardObject);
})

test('A Function can find out if it is being called with the new keyword', () => {
  expect(new SelfAwareFunction()).toEqual({message: constructorMessage});
  expect(SelfAwareFunction()).toEqual(normalCallMessage);
})

test('Flexible functions can be utilized as constructors or normal functions', () => {
  expect((new FlexibleFunction('Mike')).sayHi)
    .toBe(`Hi from object! My name is Mike.`);
  expect(FlexibleFunction('Steve')).toBe(`Hi from primitive! My name is Steve.`)
})