import pageView from "@/layout/pageView.vue";

const comp = {
  path: "/comp",
  name: "Comp",
  redirect: "/scrollmore",
  component: pageView,
  meta: {
    title: "组件",
  },
  children: [
    {
      path: "/scrollmore",
      name: "Scrollmore",
      component: () => import("@/pages/comp/component/scrollmore/index.vue"),
      meta: {
        title: "Scrollmore",
        isSubPage: true,
      },
    },
    {
      path: "/warefallFlow",
      name: "WarefallFlow",
      component: () =>
        import("@/pages/comp/component/warefallFlow/warefallFow.vue"),
      meta: {
        title: "WarefallFlow",
        isSubPage: true,
      },
    },
  ],
};

export default comp;
