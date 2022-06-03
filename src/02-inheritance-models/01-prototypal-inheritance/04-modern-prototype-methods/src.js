

const animal = {
  name: 'Animal',
  walk: function() {console.log(`${this.name} is walking`)}
}

// Creating with a prototype
const rabbit = Object.create(animal);
rabbit.walk();

// Getting prototype
console.log('\n');
console.log(Object.getPrototypeOf(rabbit));

// Setting prototype after creation, and confirming
console.log('\n');
const lion = {};
console.log(Object.getPrototypeOf(lion));
Object.setPrototypeOf(lion, animal);
lion.walk();
console.log(Object.getPrototypeOf(lion));

// Ensuring prototype reference chain - not just copied values
console.log('\n');
animal.name = 'asdf';
rabbit.walk();
lion.walk();