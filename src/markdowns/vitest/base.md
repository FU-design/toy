### 示例 1: 测试简单的函数

```javascript
// 需要测试的函数
function add(a, b) {
  return a + b;
}

// 测试用例
import { describe, it, expect } from "vitest";

describe("add function", () => {
  it("should return the sum of two numbers", () => {
    expect(add(2, 3)).toBe(5); // 使用 toBe 匹配器
  });

  it("should return a negative number if the sum is negative", () => {
    expect(add(-2, -3)).toBe(-5);
  });
});
```

**学习点**:

- 使用 `describe` 组织测试用例
- 使用 `it` 编写单个测试
- 使用 `expect` 和 `toBe` 进行简单断言

### 示例 2: 测试对象相等性

```javascript
// 需要测试的函数
function createUser(name, age) {
  return { name, age };
}

// 测试用例
describe("createUser function", () => {
  it("should return an object with name and age", () => {
    expect(createUser("Alice", 30)).toEqual({ name: "Alice", age: 30 }); // 使用 toEqual 匹配器
  });
});
```

**学习点**:

- 使用 `toEqual` 测试对象的深度相等性

### 示例 3: 测试数组内容

```javascript
// 需要测试的函数
function getFruits() {
  return ["apple", "banana", "orange"];
}

// 测试用例
describe("getFruits function", () => {
  it("should contain specific fruits", () => {
    const fruits = getFruits();
    expect(fruits).toContain("banana"); // 使用 toContain 匹配器
    expect(fruits).toHaveLength(3); // 使用 toHaveLength 匹配器
  });
});
```

**学习点**:

- 使用 `toContain` 测试数组是否包含特定元素
- 使用 `toHaveLength` 测试数组的长度

### 示例 4: 测试异步代码

```javascript
// 需要测试的函数
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("data");
    }, 100);
  });
}

// 测试用例
describe("fetchData function", () => {
  it("should return data after some time", async () => {
    const data = await fetchData();
    expect(data).toBe("data"); // 使用 async/await 测试异步代码
  });
});
```

**学习点**:

- 使用 `async/await` 处理异步测试

### 示例 5: 测试抛出异常

```javascript
// 需要测试的函数
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero");
  }
  return a / b;
}

// 测试用例
describe("divide function", () => {
  it("should throw an error when dividing by zero", () => {
    expect(() => divide(1, 0)).toThrow("Division by zero"); // 使用 toThrow 匹配器
  });
});
```

**学习点**:

- 使用 `toThrow` 测试函数抛出异常的情况

### 示例 6: 使用 `beforeEach`/`afterEach`

```javascript
// 需要测试的函数
let counter = 0;

function increment() {
  counter += 1;
}

describe("counter", () => {
  beforeEach(() => {
    counter = 0; // 每次测试前重置 counter
  });

  it("should start at zero", () => {
    expect(counter).toBe(0);
  });

  it("should increment the counter", () => {
    increment();
    expect(counter).toBe(1);
  });
});
```

**学习点**:

- 使用 `beforeEach` 进行每个测试用例前的初始化工作

### 使用指南

- 逐个实现这些示例中的测试用例，并理解每个 API 的使用场景。
- 如果遇到不理解的部分，可以参考文档或者询问我。
