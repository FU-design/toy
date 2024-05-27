import pageView from "../../layout/pageView.vue";

const minecraft = {
  path: "/mine",
  name: "Mine",
  component: pageView,
  redirect: "/mine/minecraft",
  meta: {
    title: "小世界",
  },
  children: [
    {
      path: "minecraft",
      name: "MineCraft",
      component: () => import("../../pages/minecraft/index.vue"),
      meta: {
        title: "小世界",
        isPage: true,
      },
    },
  ],
};

export default minecraft;
