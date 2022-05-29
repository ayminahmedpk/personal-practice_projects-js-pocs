
const testObj = {};

/*
  Listing properties:
    Object.keys                = string array, own/inherited keys, enumerable
    Object.getOwnPropertyNames = string array, own keys, enumerable/non-enumerable
    (key in myObject)          = iterates over own/inherited enumerable keys
*/


describe("Nesting describe block in this describe block, to ensure the inner\
describe blocks are also executed sequentially", () => {

  describe("Adding and listing properties", () => {
    beforeAll(() => {
      testObj.firstProperty = "first";
      testObj.secondProperty = "second";
    });
    test("Object.keys returns all non-inherited enumerable keys", () => {
      expect(Object.keys(testObj)).
      toEqual(["firstProperty", "secondProperty"]);
    });
    test("Object.getOwnPropertyNames returns all non-inherited keys regardless\
    of enumerability", () => {
      expect(Object.getOwnPropertyNames(testObj)).
      toEqual([ "firstProperty", "secondProperty",]);
    });
    test("key..in loops over enumerable, even if inherited", () => {
      expect(
        (() => {
          const keys = [];
          for (key in testObj) {
            keys.push(key);
          }
          return keys;
        })()
      ).toEqual(["firstProperty", "secondProperty"]);
    });
  });


  describe("Listing after deleting a property", () => {
    beforeAll(() => {
      delete testObj.firstProperty;
    });
    test("Object.keys returns all non-inherited enumerable keys", () => {
      expect(Object.keys(testObj)).toEqual(["secondProperty"]);
    });
    test("Object.getOwnPropertyNames returns all non-inherited keys regardless\
    of enumerability", () => {
      expect(Object.getOwnPropertyNames(testObj)).toEqual(["secondProperty"]);
    });
    test("key..in loops over enumerable, even if inherited", () => {
      expect(
        (() => {
          const keys = [];
          for (key in testObj) {
            keys.push(key);
          }
          return keys;
        })()
      ).toEqual(["secondProperty"]);
    });
  });


});
