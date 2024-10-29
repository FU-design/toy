function coverNew(constructor, ...args) {
  let obj = Object.create(constructor.prototype);
  let result = constructor.apply(obj, args);
  return typeof result === 'object' && result !== null ? result : obj;
}

function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log('Hello, my name is ' + this.name);
};

let person = coverNew(Person, 'Kimi');
person.sayHello(); // 输出：Hello, my name is

class Profile {
  constructor(name) {
    this.name = name;
  }
}

let profile = coverNew(Profile, 'Kimi'); // error
console.log('profile :>> ', profile.name);
