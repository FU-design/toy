document.addEventListener("DOMContentLoaded", (evt) => {
  initNodes();
  initLines();
  initGlobalEvent();
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

const lineList = [
  {
    id: "_GwJHzebo",
    source: "start",
    target: "_CPeWeFYK",
  },
];
const nodeMap = {
  start: {
    id: "start",
    type: "start",
    name: "Start",
    icon: "../../assets/svg/start.svg",
    actdesc: "收到指定接口请求触发流程",
    nodedesc: "1111111",
    nodePos: {
      initX: 0,
      initY: 0,
      startLeft: 0,
      startTop: 0,
    },
    option: {},
  },
  _CPeWeFYK: {
    id: "_CPeWeFYK",
    type: "base",
    name: "base",
    icon: "../../assets/flow/start.png",
    actdesc: "11111",
    nodedesc: "1111111",
    nodePos: {
      initX: 369,
      initY: 364,
      startLeft: 174,
      startTop: 340,
    },
  },
};
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
  for (let [id, node] of Object.entries(nodeMap)) {
    fragment.appendChild(createBaseNode(node, true));
  }
  addNode(fragment);
}

function initLines() {
  lineList.forEach((line) => {
    drawLine(line.id, line.source, line.target);
  });
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
    nodeMap[nodeCfg.id] = nodeCfg;
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
    },
    styles: {
      left: `${nodeCfg.nodePos.startLeft}px`,
      top: `${nodeCfg.nodePos.startTop}px`,
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
  const { left, bottom, width } = evt.currentTarget.getBoundingClientRect();
  const x = left + window.scrollX + width / 2;
  const y = bottom + window.scrollY + 4;
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

/**
 * 创建节点选项菜单
 * @param {*} opsList
 * @returns
 */
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

// 点击添加节点菜单选项，创建新的节点
function handleOpsItemClick(evt) {
  evt.stopPropagation();
  // 获取选中的来源节点的坐标信息
  const x = selectNode.offsetLeft;
  const y = selectNode.offsetTop;
  const height = selectNode.offsetHeight;
  // 根基节点菜单选项生成新的节点
  const newNode = createBaseNode(
    createNodeConfig(x, y + height + 100, x, y + height + 100)
  );
  // 将新生成的节点放到面板容器中
  addNode(newNode);
  // 关闭菜单
  setVisibility(false);

  // 绘制连线
  const id = generateSecureRandomString(8);
  drawLine(id, selectNode.id, newNode.id);
  // 更新全局存储连线的全局变量
  updateLineList({ id, source: selectNode.id, target: newNode.id });
  // 更改选中的节点的选中样式
  setSelectNode(newNode);
}

function updateNodePosition(nodeId) {
  lineList.forEach((link) => {
    if (link.source === nodeId || link.target === nodeId) {
      updateLinePos(link.id);
    }
  });
}

function updateLinePos(linkId) {
  let link = lineList.find((l) => l.id === linkId);
  if (!link) return;

  let sourceNode = document.querySelector(`#${nodeMap[link.source].id}`);
  let targetNode = document.querySelector(`#${nodeMap[link.target].id}`);

  const fromRect = sourceNode.getBoundingClientRect();
  const toRect = targetNode.getBoundingClientRect();

  let line = document.querySelector(`line[id='${linkId}']`); // 假设每条线都有唯一的ID作为属性
  if (line) {
    line.setAttribute(
      "x1",
      fromRect.left + window.scrollX + fromRect.width / 2
    );
    line.setAttribute("y1", fromRect.bottom + window.scrollY);
    line.setAttribute("x2", toRect.left + window.scrollX + toRect.width / 2);
    line.setAttribute("y2", toRect.top + window.scrollY - 10);
  }
}

function updateLineList(line) {
  lineList.push(line);
}

// 绘制连线
function drawLine(id, fromId, toId) {
  let svg = document.getElementById("svg");
  let line = document.createElementNS("http://www.w3.org/2000/svg", "line");

  let sourceNode = document.querySelector(`#${fromId}`);
  let targetNode = document.querySelector(`#${toId}`);

  let fromRect = sourceNode.getBoundingClientRect();
  let toRect = targetNode.getBoundingClientRect();

  line.setAttribute("id", id);
  line.setAttribute("x1", fromRect.left + window.scrollX + fromRect.width / 2);
  line.setAttribute("y1", fromRect.bottom + window.scrollY);
  line.setAttribute("x2", toRect.left + window.scrollX + toRect.width / 2);
  line.setAttribute("y2", toRect.top + window.scrollY - 10);
  line.setAttribute("stroke", "black");
  line.setAttribute("marker-end", "url(#arrowhead)");
  svg.appendChild(line);
}

// 控制菜单的显式和隐藏
function setVisibility(isvisible) {
  menu.style.visibility = isvisible ? "visible" : "hidden";
}

// 指定被选中的节点的样式
function setSelectNode(el) {
  if (selectNode) {
    selectNode.classList.remove("node-selected");
  }
  el.classList.add("node-selected");
  selectNode = el;
}

/**
 * 鼠标放下
 * @param {Event} evt
 */
function dragStart(evt) {
  evt.preventDefault();
  if (evt.target.classList.contains("connect-point")) return;
  const el = evt.currentTarget;
  draggingNode = el;
  setSelectNode(el);
  currNode = nodeMap[el.id];
  currNode.nodePos.initX = evt.clientX;
  currNode.nodePos.initY = evt.clientY;
  currNode.nodePos.startLeft = el.offsetLeft;
  currNode.nodePos.startTop = el.offsetTop;
}

/**
 * 鼠标移动
 * @param {Event} evt
 */
function dragMove(evt) {
  if (draggingNode) {
    const { nodePos } = currNode;
    const moveX = evt.clientX - currNode.nodePos.initX;
    const moveY = evt.clientY - currNode.nodePos.initY;

    draggingNode.style.left = `${nodePos.startLeft + moveX}px`;
    draggingNode.style.top = `${nodePos.startTop + +moveY}px`;
    updateNodePosition(selectNode.id);
  }
}

/**
 * 鼠标抬起
 */
function dragEnd() {
  draggingNode = null;
  currNode = null;
}

/**
 * 基本节点基本配置
 * @returns
 */
function createNodeConfig(x = 0, y = 0, startLeft = 0, startTop = 0, option) {
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
      startLeft,
      startTop,
    },
  };
  Object.assign(config, option);
  return config;
}

function getNodeList() {
  return nodeMap;
}

function getLineList() {
  return lineList;
}

// ---------------------------------- util func -------------------------------

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
  return `_${result}`;
}
