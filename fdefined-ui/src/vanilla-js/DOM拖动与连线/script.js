document.addEventListener("DOMContentLoaded", (evt) => {
  initNodes();
  initGlobalEvent();
  // handleClick();
});

const menuOps = [
  { name: "添加应用", icon: "../../assets/flow/app.png" },
  { name: "分支条件", icon: "../../assets/flow/condition.png" },
  { name: "分发流程", icon: "../../assets/flow/distribute.png" },
  { name: "循环流程", icon: "../../assets/flow/circle.png" },
  { name: "错误捕获", icon: "../../assets/flow/monitor.png" },
];

let draggingNode = null;
let selectNode = null;
let currNode = null;
let currentLine = null;
let menu = createDropMenu(menuOps);

const nodeList = [
  {
    id: "start",
    type: "start",
    name: "Start",
    class: "start-node",
    icon: "../../assets/svg/start.svg",
    actdesc: "收到指定接口请求触发流程",
    nodedesc: "1111111",
    nodePos: {
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
    nodePos: {
      initX: 0,
      initY: 0,
      offsetX: 0,
      offsetY: 0,
    },
    option: {},
  },
];

/**
 * 启动对鼠标位置的监听
 */
function initGlobalEvent() {
  document.addEventListener("mousemove", dragMove, false);
  document.addEventListener("mouseup", dragEnd, false);
}

/**
 * 根据nodeList数据列表生成数据
 */
function initNodes() {
  const fragment = document.createDocumentFragment();
  nodeList.forEach((node) => {
    fragment.appendChild(createBaseNode(node, true));
  });
  addNode(fragment);
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
  const connectPoint = createElement({
    tag: "div",
    attrs: {
      id: nodeCfg.id,
      class: "connect-point",
    },
    children: ["+"],
  });
  const node = createElement({
    tag: "div",
    attrs: {
      id: nodeCfg.id,
      [`data-type`]: nodeCfg.type,
      class: `${nodeCfg.class}`,
    },
    styles: {
      transform: `translate3d(${nodeCfg.nodePos.initX}px, ${nodeCfg.nodePos.initY}px, 0px)`,
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
      connectPoint,
    ],
  });
  connectPoint.addEventListener("click", showDropOptions);
  node.addEventListener("mousedown", dragStart);
  node.addEventListener("click", handleSelectNode);
  return node;
}

function handleSelectNode(evt) {
  evt.stopPropagation();
  setSelectNode(evt.currentTarget);
}

function showDropOptions(evt) {
  document.body.appendChild(menu);
  const rect = evt.currentTarget.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.bottom + 4;
  menu.style.left = `${x}px`;
  menu.style.top = `${y}px`;
  setVisibility(true);
  document.addEventListener("click", handleMenuClose, true);
}

function handleMenuClose(evt) {
  if (!menu.contains(evt.target)) {
    setVisibility(false);
  }
  document.removeEventListener("click", handleMenuClose, true);
}

function createDropMenu(opsList) {
  const children = opsList.map((v) => {
    const item = createElement({
      tag: "div",
      children: [
        createElement({
          tag: "div",
          attrs: { class: "icon" },
          children: [
            createElement({
              tag: "img",
              attrs: { src: `${v.icon}` },
            }),
          ],
        }),
        createElement({
          tag: "div",
          children: [`${v.name}`],
        }),
      ],
    });
    item.onclick = handleOpsItemClick;
    return item;
  });
  return createElement({
    tag: "div",
    attrs: {
      class: "dropdown-menu",
    },
    children,
  });
}

function createLine(x1, y1, x2, y2, id) {
  // 确保有一个SVG容器
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("id", "svgContainer");
  document.body.appendChild(svg);

  let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("id", id);
  line.style.stroke = "black"; // 线的颜色
  line.style.strokeWidth = "2"; // 线的宽度
  document.getElementById("svgContainer").appendChild(line);
}

// 点击添加节点菜单选项，创建新的节点
function handleOpsItemClick(evt) {
  evt.stopPropagation();
  const { left: x, top: y } = menu.getBoundingClientRect();
  const newNode = createBaseNode(createNodeConfig(x, y, x, y));
  addNode(newNode);
  setVisibility(false);
  setSelectNode(newNode);
}

function setVisibility(isvisible) {
  menu.style.visibility = isvisible ? "visible" : "hidden";
}

function setSelectNode(el) {
  if (selectNode) {
    selectNode.classList.remove("node-selected");
  }
  el.classList.add("node-selected");
  selectNode = el;
}

/**
 * 查找源节点列表中等于 id 的节点
 * @param {string} id
 * @returns
 */
function searchNodeInfo(id) {
  return nodeList.find((v) => v.id === id);
}

/**
 * 鼠标放下
 * @param {Event} evt
 */
function dragStart(evt) {
  evt.preventDefault();
  if (evt.target.classList.contains("connect-point")) {
    return;
  }
  const el = evt.currentTarget;
  draggingNode = el;
  setSelectNode(el);
  currNode = searchNodeInfo(draggingNode.id);
  currNode.nodePos.initX = evt.clientX - currNode.nodePos.offsetX;
  currNode.nodePos.initY = evt.clientY - currNode.nodePos.offsetY;
}

/**
 * 鼠标移动
 * @param {Event} evt
 */
function dragMove(evt) {
  if (draggingNode) {
    currNode.nodePos.offsetX = evt.clientX - currNode.nodePos.initX;
    currNode.nodePos.offsetY = evt.clientY - currNode.nodePos.initY;
    draggingNode.style.transform = `translate3d(${currNode.nodePos.offsetX}px, ${currNode.nodePos.offsetY}px, 0)`;
  }
}

function dragEnd() {
  draggingNode = null;
  currNode = null;
}

/**
 * 基本节点基本配置
 * @returns
 */
function createNodeConfig(x = 0, y = 0, offsetX = 0, offsetY = 0, option) {
  const id = generateSecureRandomString(8);
  const config = {
    id,
    type: "base",
    name: "base",
    icon: "../../assets/flow/start.png",
    actdesc: "11111",
    nodedesc: "1111111",
    nodePos: {
      initX: x,
      initY: y,
      offsetX,
      offsetY,
    },
  };
  Object.assign(config, option);
  return config;
}

// function handleClick() {
//   const btn = document.querySelector(".add-node-btn");
//   btn.addEventListener("click", (e) => {
//     addNode(createBaseNode(createNodeConfig()));
//   });
// }

function getNodeList() {
  return nodeList;
}

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
