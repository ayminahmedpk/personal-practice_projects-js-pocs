const simpleAccessors = {
  name    : "John",
  surname : "Smith",
  get fullName() { return `${this.name} ${this.surname}`; },
  set fullName(fullName) {[this.name, this.surname] = fullName.split(" ");}
}

const smartAccessors = {
  get name() {return this._name;} ,
  set name(name) {
    if(name.length < 4) {
      console.log('Name is too short; minimum 4 characters');
      return;
    }
    this._name = name;
  },
}

describe('Describe block to nest other describe blocks, for sequential testing', () => {

  describe('', () => { test('Using a simple accessor to read', () => {
    expect(simpleAccessors.fullName).toBe('John Smith');
  });});

  describe('Writing using simple accessor',() => {
    beforeAll(() => { simpleAccessors.fullName = "John Doe"; })
    test('Confirming after writing using simple accessor', () => {
      expect([simpleAccessors.name, simpleAccessors.surname]).
      toEqual(['John', 'Doe']);
    });
  });

  describe('', () => { test('Using a smart accessor to read nonexistent property', () => {
    expect(smartAccessors.name).toBeUndefined();
  });});

  describe('', () => {
    beforeAll(() => {smartAccessors.name = 'Michael';});
    test('Checking if smart accessor set the right property', () => {
      expect(smartAccessors._name).toBe('Michael');
    });
  });

  describe('Attempting invalid write attempt', () => {
    beforeAll(() => {smartAccessors.name = 'Joe';});
    test('Checking if smart accessor blocked invalid write attempt', () => {
      expect((smartAccessors._name)).toBe('Michael');
    });
  });

});