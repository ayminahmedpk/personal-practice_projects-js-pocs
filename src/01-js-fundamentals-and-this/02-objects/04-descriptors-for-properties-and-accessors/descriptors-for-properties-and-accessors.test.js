"use-strict"

const normalObj = {
  first  : "Change this value",
  second : "Make this read-only",
  third  : "Make this non-enumerable",
  fourth : "Make this non-configurable"
};

const accessorObj = {
  name: 'John',
  surname: 'Smith',
}


describe('Hierarchy of describe boxes for sequential test execution', () => {

  // Reading all properties' descriptors at once
  // console.log(Object.getOwnPropertyDescriptors(normalObj));

  // Reading one property's descriptors at a time
  // for(key in normalObj) {
  //   console.log(Object.getOwnPropertyDescriptor(normalObj, key))
  // }

  describe('value', () => {
    beforeAll(() => {
      Object.defineProperty(normalObj, 'first', { value: "New value", })
    });
    test('Changing value through descriptor', () => {
      // console.log(Object.getOwnPropertyDescriptors(normalObj));
      expect(normalObj.first).toBe('New value');
    })
  })

  describe('writable', () => {
    beforeAll(() => {
      normalObj.second = `Before making read-only`
      Object.defineProperty(normalObj, 'second', { writable: false, });
      normalObj.second = `After making read-only`
    });
    test(`Can't edit non-writable (read-only) property`, () => {
      expect(normalObj.second).toBe(`Before making read-only`);
    })
  })

  // More about advanced listing (enumerable, inherited) in advance-listing
  describe('enumerable', () => {
    beforeAll( () => {
      Object.defineProperty(normalObj, 'third', {enumerable: false});
    });
    test(`Object.keys doesn't list non-enumerable property`, () => {
      expect(Object.keys(normalObj)).toEqual(['first','second', 'fourth']);
    });
  });

  describe('configurable', () => {
    beforeAll( () => {
      Object.defineProperty(normalObj, 'fourth', {configurable: false});
    })
    test(`Non-configurable can be made non-writable, but no other changes possible`, () => {
      expect(() => {Object.defineProperty(normalObj, 'fourth', {writable: false})})
      .not.toThrow(Error);
    });
    test('Non-configurable can not have any other changes made to it', () => {
      expect(() => {Object.defineProperty(normalObj, 'fourth', {enumerable: false})})
      .toThrow(TypeError);
    });
  })


  describe('Creating an accessor through descriptors', () => {
    beforeAll( () => {
      Object.defineProperty(accessorObj, 'fullName', {
        get() { return `${this.name} ${this.surname}`; },
        set(fullName) {[this.name, this.surname] = fullName.split(" ");},
        configurable: true,
        enumerable: true,
      });
    });
    test('Newly created accessor should work as expected', () => {
      expect(accessorObj.fullName).toBe('John Smith');
    })
  })

})
