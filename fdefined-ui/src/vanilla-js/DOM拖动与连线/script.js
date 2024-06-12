let selectedNode = null;
let currNode = null;
let oldNode = null;

const nodeList = [
  {
    id: "start",
    type: "start",
    name: "Start",
    class: "start-node",
    icon: "../../assets/svg/start.svg",
    actdesc: "收到指定接口请求触发流程",
    nodedesc: "1111111",
    mousePos: {
      initX: 0,
      initY: 0,
      offsetX: 0,
      offsetY: 0,
    },
    option: {},
  },
  {
    id: "end",
    type: "end",
    name: "End",
    class: "end-node",
    icon: "../../assets/svg/end.svg",
    actdesc: "收到指定接口请求触发流程",
    nodedesc: "1111111",
    mousePos: {
      initX: 0,
      initY: 0,
      offsetX: 0,
      offsetY: 0,
    },
    option: {},
  },
];

document.addEventListener("DOMContentLoaded", (evt) => {
  initNodes();
  initGlobalEvent();
  handleClick();
});

/**
 * 启动对鼠标位置的监听
 */
function initGlobalEvent() {
  document.addEventListener("mousemove", dragMove, false);
}

/**
 * 根据nodeList数据列表生成数据
 */
function initNodes() {
  const f = document.createDocumentFragment();
  nodeList.forEach((n) => {
    f.appendChild(createBaseNode(n, true));
  });
  addNode(f);
}

/**
 * 添加节点到视图
 * @param {Object} node
 */
function addNode(node) {
  const layout = document.querySelector(".layout");
  layout.appendChild(node);
}

/**
 * 创建基本的节点
 * @param {Object} nodeCfg
 * @param {boolean} isInit 是否是初始化
 * @returns
 */
function createBaseNode(nodeCfg, isInit = false) {
  if (!isInit) {
    nodeList.push(nodeCfg);
  }
  const node = createElement({
    tag: "div",
    attrs: {
      id: nodeCfg.id,
      [`data-type`]: nodeCfg.type,
      class: `${nodeCfg.class}`,
    },
    children: [
      createElement({
        tag: "div",
        attrs: {
          class: "node-head",
        },
        children: [
          createElement({
            tag: "img",
            attrs: { src: nodeCfg.icon },
          }),
          createElement({
            tag: "div",
            children: [`${nodeCfg.name}`],
          }),
        ],
      }),
      createElement({
        tag: "div",
        attrs: {
          class: "node-info",
        },
        children: [
          createElement({
            tag: "div",
            children: [`${nodeCfg.actdesc}`],
          }),
          createElement({
            tag: "div",
            children: [`${nodeCfg.nodedesc}`],
          }),
        ],
      }),
    ],
  });
  node.addEventListener("mousedown", dragSelect);
  node.addEventListener("mouseup", dragEnd);
  return node;
}

/**
 * 基本节点基本配置
 * @returns
 */
function createNodeConfig() {
  const id = generateSecureRandomString(8);
  return {
    id,
    type: "base",
    name: "base",
    icon: "../../assets/flow/start.png",
    actdesc: "11111",
    nodedesc: "1111111",
    mousePos: {
      initX: 0,
      initY: 0,
      offsetX: 0,
      offsetY: 0,
    },
    option: {},
  };
}

/**
 * 创建一个DOM元素，并可选地设置属性、样式和子节点。
 * @param {string} tag 表示标签名的字符串。
 * @param {Object} [options.attrs] 要设置的属性键值对。
 * @param {Object} [options.styles] 要应用的CSS样式键值对。
 * @param {Array} [options.children] 子元素，可以是字符串（文本节点）或DOM元素。
 * @returns {Element} 新创建的DOM元素。
 */
function createElement({ tag, attrs = {}, styles = {}, children = [] }) {
  const element = document.createElement(tag);
  Object.keys(attrs).forEach((attr) => {
    element.setAttribute(attr, attrs[attr]);
  });
  Object.keys(styles).forEach((style) => {
    element.style[style] = styles[style];
  });
  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });
  return element;
}

/**
 * 查找源节点列表中等于 id 的节点
 * @param {*} id
 * @returns
 */
function searchNodeInfo(id) {
  return nodeList.find((v) => v.id === id);
}

/**
 * 鼠标放下
 * @param {Event} evt
 */
function dragSelect(evt) {
  evt.preventDefault();
  selectedNode = evt.currentTarget;
  currNode = searchNodeInfo(selectedNode.id);
  checkSelected();
  currNode.mousePos.initX = evt.clientX - currNode.mousePos.offsetX;
  currNode.mousePos.initY = evt.clientY - currNode.mousePos.offsetY;
}

/**
 * 鼠标移动
 * @param {Event} evt
 */
function dragMove(evt) {
  if (selectedNode) {
    currNode.mousePos.offsetX = evt.clientX - currNode.mousePos.initX;
    currNode.mousePos.offsetY = evt.clientY - currNode.mousePos.initY;
    selectedNode.style.transform = `translate3d(${currNode.mousePos.offsetX}px, ${currNode.mousePos.offsetY}px, 0)`;
  }
}

/**
 * 鼠标抬起
 * @param {*} evt
 */
function dragEnd(evt) {
  const el = evt.currentTarget;
  if (searchNodeInfo(el.id)) {
    oldNode = currNode;
    selectedNode = null;
    currNode = null;
  }
}

/**
 * 用于切换选中的节点的样式
 */
function checkSelected() {
  if (oldNode && oldNode.id != currNode.id) {
    const old = document.querySelector(`#${oldNode.id}`);
    old.style.zIndex = 1;
    old.style.border = "none";
  }
  selectedNode.style.zIndex = 10;
  selectedNode.style.border = "1px solid blue";
}

/**
 * 模拟节点id
 * @param {*} length
 * @returns
 */
function generateSecureRandomString(length) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  array.forEach((value) => {
    result += characters.charAt(value % characters.length);
  });
  return result;
}

/**
 * 按钮添加节点
 */
function handleClick() {
  const btn = document.querySelector(".add-node-btn");
  btn.addEventListener("click", (e) => {
    addNode(createBaseNode(createNodeConfig()));
  });
}

/**
 * 获取所有的节点信息
 * @returns
 */
function getNodeList() {
  return nodeList;
}
