

class Parent {
  constructor() {
    this.message = `My class field 'classField' equals ${this.classField}.`;
  }
  classField = "ParentValue";
  showMessage() {return this.message};
}


class Child extends Parent {
  classField = "ChildValue";
}

const childInstance = new Child();


describe('The class field bug reproduced:', () => {
  test('Child instance has overridden class field value', () => {
    expect(childInstance.classField).toBe('ChildValue');
  })
  test('Yet, child constructor used Parent class field value', () => {
    expect(childInstance.showMessage()).
    toBe(`My class field 'classField' equals ParentValue.`);
  })
})