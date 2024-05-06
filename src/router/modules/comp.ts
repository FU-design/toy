import pageView from "@/layout/pageView.vue";

const comp = {
  path: "/comp",
  name: "Comp",
  redirect: "/comp/scrollmore",
  component: pageView,
  meta: {
    title: "组件",
  },
  children: [
    {
      path: "scrollmore",
      name: "Scrollmore",
      component: () => import("@/pages/comp/component/scrollmore/index.vue"),
      meta: {
        title: "Scrollmore",
        isSubPage: true,
      },
    },
    {
      path: "warefallFlow",
      name: "WarefallFlow",
      component: () =>
        import("@/pages/comp/component/warefallFlow/warefallFow.vue"),
      meta: {
        title: "WarefallFlow",
        isSubPage: true,
      },
    },
    {
      path: "drag",
      name: "Drag",
      component: () => import("@/pages/comp/component/drag/index.vue"),
      meta: {
        title: "Drag",
        isSubPage: true,
      },
    },
    {
      path: "tagTextMixInput",
      name: "TagTextMixInput",
      component: () =>
        import("@/pages/comp/component/tagTextMixInput/index.vue"),
      meta: {
        title: "TagTextMixInput",
        isSubPage: true,
      },
    },
    {
      path: "canvas",
      name: "Canvas",
      component: () => import("@/pages/comp/component/canvas/index.vue"),
      meta: {
        title: "Canvas",
        isSubPage: true,
      },
    },
  ],
};

export default comp;
