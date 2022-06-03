const firstAnimal = {
  animalName: "Animal one",
  walk: function() {
    console.log(`${this.animalName} is walking`);
  }
}

console.log(firstAnimal);
const firstRabbit = { animalType: 'Rabbit' }
firstRabbit.__proto__ = firstAnimal;
console.log(firstRabbit.animalName);
firstRabbit.walk();

// -- test to see if the prototype is a reference, i.e. there is a real chain
console.log('\n');
console.log("Editing parent property changes child's returned value as well,\
so long as child doesn't have a local version of that value.")
console.log('firstAnimal.animalName = "wxyz"');
firstAnimal.animalName = "wxyz";
console.log('console.log(firstRabbit.animalName);');
console.log(firstRabbit.animalName);


console.log('\n');
console.log('firstRabbit.walk();')
firstRabbit.walk();
console.log("firstRabbit.animalName = 'Mr. Rabbit';");
firstRabbit.animalName = 'Mr. Rabbit';
console.log('firstRabbit.walk();');
firstRabbit.walk();
console.log('firstAnimal.walk();');
firstAnimal.walk();

console.log('\n\n')
console.log('Essentially works.');