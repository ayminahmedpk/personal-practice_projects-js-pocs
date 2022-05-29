let testObj = {}

describe("Nesting describe blocks in this describe block, to ensure the inner\
describe blocks are also executed sequentially", () => {

  describe("adding and accessing/reading properties", () => {
    beforeAll( () => {
      testObj.firstProperty = "first";
      testObj.secondProperty = "second";
    })  
    test("Non-existent property should return undefined", () => {
      expect(testObj.nonExistent).toBeUndefined();
      expect(testObj["nonExistent"]).toBeUndefined();
    });
    test("Reading existing property values", () => {
      expect(testObj.firstProperty).toBe("first");
      expect(testObj.secondProperty).toBe("second");
    })
    test("Confirming object contents", () => {
      expect(testObj).toEqual({
        firstProperty  : "first",
        secondProperty : "second",
      })
    });
  });
  
  describe("deleting properties", () => {
    beforeAll( ()=> { delete testObj.firstProperty; })
    test("deleting a property", () => {
      expect(testObj).toEqual({secondProperty: "second"});
    })
  });
});