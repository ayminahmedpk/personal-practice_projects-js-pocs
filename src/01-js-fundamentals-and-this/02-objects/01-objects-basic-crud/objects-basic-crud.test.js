let testObj = {}

describe("Nesting describe blocks in this describe block, to ensure the inner\
describe blocks are also executed sequentially", () => {

  describe("adding and accessing/reading properties", () => {
    beforeAll( () => {
      testObj.firstProperty = "first";
      testObj.secondProperty = "second";
      testObj['third property'] = "third";
    })  
    test("Non-existent property should return undefined", () => {
      expect(testObj.nonExistent).toBeUndefined();
      expect(testObj["nonExistent"]).toBeUndefined();
    });
    test("Reading existing property values", () => {
      expect(testObj.firstProperty).toBe("first");
      expect(testObj['secondProperty']).toBe("second");
      expect(testObj['third property']).toBe("third");
    })
    test("Confirming object contents", () => {
      expect(testObj).toEqual({
        firstProperty    : "first",
        secondProperty   : "second",
        "third property" : "third",
      })
    });
  });
  
  describe("deleting properties", () => {
    beforeAll( ()=> { delete testObj.firstProperty; })
    test("deleting a property", () => {
      expect(testObj).toEqual({
        secondProperty   : "second",
        "third property" : "third",
      });
    })
  });
});