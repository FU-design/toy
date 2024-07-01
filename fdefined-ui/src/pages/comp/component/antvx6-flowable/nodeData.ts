export const data = {
  nodes: [
    {
      position: {
        x: 300,
        y: -20,
      },
      size: {
        width: 200,
        height: 48,
      },
      view: "vue-shape-view",
      shape: "start",
      ports: {
        groups: {
          out: {
            position: "bottom",
            attrs: {
              circle: {
                r: 4,
                magnet: false,
                stroke: "transparent",
                strokeWidth: 1,
                fill: "transparent",
              },
            },
          },
        },
        items: [
          {
            id: "node-0-out",
            group: "out",
            attrs: {
              circle: {
                fill: "transparent",
                stroke: "transparent",
              },
            },
          },
        ],
      },
      id: "node-0",
      data: {
        name: "数据输入_1",
        type: "INPUT",
        checkStatus: "sucess",
      },
      zIndex: 1,
    },
  ],
  edges: [],
};
