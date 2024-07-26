const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("resolve3");
    console.log("timer1");
  }, 0);
  resolve("resovle1");
  resolve("resolve2");
})
  .then((res) => {
    console.log(res);
    setTimeout(() => {
      console.log(p1);
    }, 1000);
  })
  .finally((res) => {
    console.log("finally", res);
  });

// // https://github.com/wangzheng0822/algo/blob/master/javascript/06_linkedlist/SinglyLinkedList.js
// class Node {
//   constructor(element) {
//     this.element = element;
//     this.next = null;
//   }
// }

// class LinkedList {
//   constructor() {
//     this.head = new Node("head");
//   }

//   findByVal(item) {
//     let currentNode = this.head.next;
//     while (currentNode !== null && currentNode.element !== item) {
//       currentNode = currentNode.next;
//     }
//     return currentNode === null ? -1 : currentNode;
//   }

//   findByIdx(idx) {
//     let currentNode = this.head.next;
//     let pos = 0;
//     while (currentNode !== null && pos != idx) {
//       currentNode = currentNode.next;
//       pos++;
//     }
//     return currentNode === null ? -1 : currentNode;
//   }

//   append(newElment) {
//     const newNode = new Node(newElment);
//     let currentNode = this.head;
//     while (currentNode.next) {
//       currentNode = currentNode.next;
//     }
//     currentNode.next = newNode;
//   }

//   insert(newElment, element) {
//     const currentNode = this.findByVal(element);
//     if (currentNode === -1) {
//       console.log("未找到插入位置");
//       return;
//     }
//     const newNode = new Node(newElment);
//     newNode.next = currentNode.next;
//     currentNode.next = newNode;
//   }

//   findPrev(item) {
//     let currentNode = this.head;
//     while (currentNode.next !== null && currentNode.next.element !== item) {
//       currentNode = currentNode.next;
//     }
//     if (currentNode.next === null) {
//       return -1;
//     }
//     return currentNode;
//   }

//   remove(item) {
//     const prevNode = this.findPrev(item);
//     if (prevNode === -1) {
//       console.log("未找到元素");
//       return;
//     }
//     prevNode.next = prevNode.next.next;
//   }

//   display() {
//     let currentNode = this.head.next;
//     while (currentNode !== null) {
//       console.log("currentNode.element :>> ", currentNode.element);
//       console.log("currentNode.next :>> ", currentNode.next);
//       currentNode = currentNode.next;
//     }
//   }
// }

// // 测试

// const LList = new LinkedList();

// LList.append("1");
// LList.append("2");
// LList.append("3");
// LList.append("4");

// // // 在首元素后插入新节点
// // LList.insert("0", "1");
// // LList.insert("5", "4");

// // LList.display();
// console.log('LList.findByVal("2") :>> ', LList.findByVal("2"));

// // console.log("LList :>> ", LList);
