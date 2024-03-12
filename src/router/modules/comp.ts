import pageView from "@/layout/pageView.vue";

const comp = {
  path: "/comp",
  name: "Comp",
  component: pageView,
  redirect: "/compsplace",
  meta: {
    title: "组件",
  },
  children: [
    {
      path: "/compsplace",
      name: "compsPlace",
      component: () => import("@/pages/comp/index.vue"),
      meta: {
        title: "组件",
        isPage: true,
      },
    },
  ],
};

export default comp;
