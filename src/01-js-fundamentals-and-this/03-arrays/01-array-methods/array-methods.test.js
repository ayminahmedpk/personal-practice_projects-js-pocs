const countries = [
    "Afghanistan",
    "Bangladesh",
    "Chad",
    "China",
]

let result;

// Map: Capitalize
// Filter: Only those greater than 4 chars
// Reduce: The number of unique starting alphabets

// arr.map(function(item, index, array) { ... });
describe('Map', () => {
  beforeAll(() => {result = countries.map(country => country.toUpperCase())});

  test('should return a new array', () => {
    expect(result).not.toBe(countries);
  })

  test('should not modify the original array', () => {
    expect(countries).toEqual(["Afghanistan", "Bangladesh", "Chad", "China"]);
  })

  test('should return a transformed array', () => {
    expect(result).toEqual(["AFGHANISTAN", "BANGLADESH", "CHAD", "CHINA"]);
  })
});

// arr.filter(function(item, index, array) { ... });
describe('Filter', () => {
  beforeAll(() => {result = countries.filter(country => country.length > 4)});

  test('should return a new array', () => {
    expect(result).not.toBe(countries);
  })

  test('should not modify the original array', () => {
    expect(countries).toEqual(["Afghanistan", "Bangladesh", "Chad", "China"]);
  })

  test('should return a filtered array', () => {
    expect(result).toEqual(["Afghanistan", "Bangladesh", "China"]);
  })
})

// arr.reduce(function(accumulator, item, index, array) {
//   // ...
// }, [initial]);
describe('Reduce', () => {
  beforeAll(() => {
    result = countries.reduce(
      (uniqueFirstLetters, country) => {
        let firstLetter = country.charAt(0).toLowerCase();
        if(!uniqueFirstLetters.includes(firstLetter)) {
          uniqueFirstLetters.push(firstLetter);
        }
        return uniqueFirstLetters;
      },
      []
    );
  });

  test('should return a new item', () => {
    expect(result).not.toBe(countries);
  })

  test('should not modify the original array', () => {
    expect(countries).toEqual(["Afghanistan", "Bangladesh", "Chad", "China"]);
  })
  
  test('should derive a value based on the given function', () => {
    expect(result).toEqual(['a', 'b', 'c']);
  })
})

