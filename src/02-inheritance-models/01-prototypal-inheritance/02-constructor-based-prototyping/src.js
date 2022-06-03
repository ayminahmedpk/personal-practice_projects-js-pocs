

// Belongs in prototype-inheritance-model
// console.log(`Assertion: New objects should have Object as [[Prototype]] by default`)
// const emptyObject = {};
// console.log(emptyObject);
// console.log('\n\n\n\n\n\n');


// console.log('Part 1: Setting prototype via constructor');
// console.log('\n\n');
function AnimalConstructor(animalName) {
  this.animalName = animalName;
  this.walk = function() {
    return `${this.animalName} is walking`
  };
}
console.log(`** Created constructor function 'AnimalConstructor' **`)
console.log("Be default, a constructor function (or any function really) has a\
property 'prototype', which is an object with only 1 property: a\ 'constructor'\
property that points to the function itself")
console.log(`Examine the value of the 'prototype' property:`)
console.log(Object.getOwnPropertyDescriptors(AnimalConstructor));
console.log(`(Ignore the [[Prototype]] nested in .prototype, that is just\
 because the .prototype itself is an object and so has its own [[Prototype]].)`)
console.log('\n\n');


const firstAnimal = new AnimalConstructor('Animal One');
console.log(`** instantiated object 'firstAnimal' using AnimalConstructor **`)
console.log("Objects derive their [[Prototype]] and its 'constructor' property\
 from the constructor function's .prototype property");
// console.log(firstAnimal);
console.log('firstAnimal.walk(): ');
console.log(firstAnimal.walk())
console.log('firstAnimal = ', firstAnimal)
console.log('\n');
console.log("Notice how firstAnimal's [[Prototype]] has a constructor property,\
 that points to the function AnimalConstructor.")
console.log("We can view that constructor by simply reading firstAnimal.constructor\
 (probably a getter) which brings us the relevant constructor.")
console.log('firstAnimal.constructor = ', firstAnimal.constructor);
console.log('\n\n\n\n\n\n');


function RabbitConstructor() { this.animalType = 'Rabbit'; }
console.log('** Created RabbitConstructor - with hardcoded property animalType=Rabbit **');
console.log('RabbitConstructor.prototype = ', RabbitConstructor.prototype)
console.log('** setting RabbitConstructor.prototype = firstAnimal; **');
RabbitConstructor.prototype = firstAnimal;
console.log('RabbitConstructor.prototype = ', RabbitConstructor.prototype)
console.log('\n\n');
const firstRabbit = new RabbitConstructor();
console.log('** Instantiated a Rabbit **')
console.log('firstRabbit = ', firstRabbit);
console.log('firstRabbit.animalName: ');
console.log(firstRabbit.animalName)
console.log('firstRabbit.walk(): ');
console.log(firstRabbit.walk())
console.log("Since we changed RabbitConstructor's .prototype property directly,\
 now we lost the 'constructor' property inside firstRabbit's [[Prototype]]. In\
 fact, firstRabbit.constructor now points to its prototype's constructor instead:")
console.log('firstRabbit.constructor = ', firstRabbit.constructor);
console.log('\n\n\n\n\n\n');


console.log("Let's try to retain the right constructor (the actual one) this time.")
console.log('\n');
function LionConstructor() {
  this.animalType = 'Lion';
  this.constructor = LionConstructor;
}
console.log('** Created LionConstructor - with hardcoded property animalType=Lion **');
console.log('LionConstructor.prototype = ', LionConstructor.prototype)
console.log('** setting LionConstructor.prototype = firstAnimal; **');
LionConstructor.prototype = firstAnimal;
console.log('LionConstructor.prototype = ', LionConstructor.prototype)
const firstLion = new LionConstructor();
console.log(firstLion);
// --- test to see if there is a prototype chain, or if the are just copied
firstAnimal.animalName = 'wxyz';
console.log(firstRabbit.animalName);
console.log(firstLion.animalName);
console.log(firstLion.constructor);
console.log(firstLion.constructor.prototype);
console.log('\n');

console.log("Result: There are 5 ways, 2 work poorly, 1 doesn't work at all,\
 1 works imperfectly and the  and the one that does is a hack by myself.")
console.log('\n');
console.log("1. Recreating LionConstructor.prototype object entirely with\
 firstAnimal's properties, and a constructor property pointing to\
 LionConstructor.");
console.log("2. Adding prototype object's properties one by one to\
 LionConstructor's prototype property, without touching constructor.")
console.log("3. Recreating LionConstructor.prototype with ...firstAnimal and\
 ...LionConstructor.prototype");
console.log("4. Editing LionConstructor.prototype after setting it to firstAnimal")
console.log("5. Adding constructor: LionConstructor into the constructor itself\
, so objects instantiate with the right constructor")
console.log('\n');

console.log("1 & 2 don't create a prototype chain - they simply copy the\
 properties into the new constructor. This may not be what you want, especially\
 if you are trying to inherit from a long, heavy prototype chain.")
console.log('\n');
console.log("3 doesn't work at all, because it simply doesn't write the\
 LionConstructor.prototype's constructor property into the new version of it.")
console.log('\n');
console.log("4 doesn't work at all, because you end up editing the prototype\
 firstAnimal itself, rather than the prototype property of LionConstructor.")
console.log('\n');
console.log("5 works, in that it gives the right value for firstLion.constructor\
 and also is part of a prototype chain rather than simply copying stuff. But\
 know that the 'constructor' property is part of the object itself, not\
 mysteriously stored in its [[Prototype]] object - nor is it hidden.");

console.log('\n');
console.log("After all this, I'm doubtful if having the right constructor\
 property is even really that important. So overwriting the .prototype may\
 simply be the right way to go about this, unless you encounter some extremely\
 specific requirements.")

console.log('\n');
console.log("Realistically and practically, it's not a good idea to delve into\
 this rabbit hole any further. Prototypes are history now. Class handles all\
 these matters for us implicitly. And now, we do have a good idea of what is\
 going on under the scenes.")

// Works, retains a constructor property property in [[Prototype]] which points
// to LionConstructor.
// However, it is no longer 'pointing' to firstAnimal for hidden values, we
// are directly copying those values. There is no prototype 'chain' towards
// firstAnimal and beyond. firstLion's [[Prototype]] actually points to the
// default Object.
// LionConstructor.prototype = {
//   ...firstAnimal,
//   constructor: LionConstructor
// };
// console.log(LionConstructor.prototype);
// const firstLion = new LionConstructor();
// console.log(firstLion);
// // --- test to see if there is a prototype chain, or if the are just copied
// firstAnimal.animalName = 'wxyz';
// console.log(firstRabbit.animalName);
// console.log(firstLion.animalName);


// Works, retains the hidden constructor property LionConstructor()
// However, it is no longer 'pointing' to firstAnimal for hidden values, we
// are directly copying those values. There is no prototype 'chain' towards
// firstAnimal and beyond. firstLion's [[Prototype]] actually points to the
// default Object.
//
//console.log('LionConstructor.prototype.animalName = firstAnimal.animalName');
// LionConstructor.prototype.animalName = firstAnimal.animalName;
// console.log('LionConstructor.prototype.walk = firstAnimal.walk');
// LionConstructor.prototype.walk = firstAnimal.walk;
// console.log('LionConstructor.prototype = ', LionConstructor.prototype;
// const firstLion = new LionConstructor();
// console.log(firstLion);
// // --- test to see if there is a prototype chain, or if the are just copied
// firstAnimal.animalName = 'wxyz';
// console.log(firstRabbit.animalName);
// console.log(firstLion.animalName);


// Doesn't work either, gets rid of the constructor property entirely
// console.log('LionConstructor.prototype = {...firstAnimal, ...LionConstructor.prototype};')
// LionConstructor.prototype = {...firstAnimal, ...LionConstructor.prototype};
// console.log(LionConstructor.prototype);


// Doesn't work, because editing prototype.constructor edits the prototype object
// itself
// console.log('** setting LionConstructor.prototype = firstAnimal; **');
// LionConstructor.prototype = firstAnimal;
// LionConstructor.prototype.constructor = LionConstructor;
// console.log('LionConstructor.prototype = ', LionConstructor.prototype)
// console.log('firstAnimal = ', firstAnimal);