// {
//   function createIncrement() {
//     let count = 0;
//     function increment() {
//       count++;
//     }

//     // let message = `Count is ${count}`;
//     function log() {
//       let message = `Count is ${count}`;
//       console.log(message);
//     }

//     return [increment, log];
//   }

//   const [increment, log] = createIncrement();
//   increment();
//   increment();
//   increment();
//   log(); // What is logged?
// }

// const message = "Hello, World!";

// setTimeout(function callback() {
//   console.log(message); // logs "Hello, World!"
// }, 1000);

// let i;
// for (i = 0; i < 3; i++) {
//   (function (j) {
//     setTimeout(() => {
//       console.log("j :>> ", j);
//     }, 100);
//   })(i);
// }

// {
//   function Stack() {
//     let items = [];
//     return items;
//   }
//   const stack = new Stack();
//   stack.push(1);
//   stack.push(2);
//   stack.push(3);

//   console.log("stack :>> ", stack); // [ 1, 2, 3 ]
//   stack.length = 0;
//   console.log("stack :>> ", stack); // []
// }

// {
//   function Stack() {
//     let items = [];

//     return {
//       get: () => {
//         return items;
//       },
//       push: (item) => {
//         items.push(item);
//       },
//       pop: () => {
//         return items.pop();
//       },
//     };
//   }
//   const stack = new Stack();
//   stack.push(1);
//   stack.push(2);
//   stack.push(3);

//   console.log("stack :>> ", stack.get()); // [ 1, 2, 3 ]
//   stack.length = 0;
//   console.log("stack :>> ", stack.get()); // [1, 2, 3]
// }
