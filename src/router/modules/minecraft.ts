import pageView from "@/layouts/pageView.vue";

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
      component: () => import("@/pages/minecraft/index.vue"),
      meta: {
        title: "小世界",
      },
    },
  ],
};

export default minecraft;
