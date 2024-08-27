type Curry = (fn: (...args: any[]) => any) => (...args: any[]) => any;

const curry: Curry = (fn) => {
  return function curried(this: any, ...args) {
    if (fn.length <= args.length) {
      return fn.apply(this, args);
    }
    return (...args2: any[]) => curried.apply(this, [...args, args2]);
  };
};

type Join = (...args: any[]) => string;

const join: Join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};

const curriedJoin = curry(join);
setTimeout(console.log, 0, curriedJoin(1, 2, 3));
setTimeout(console.log, 0, curriedJoin(1));
setTimeout(console.log, 0, curriedJoin(1, 2));
