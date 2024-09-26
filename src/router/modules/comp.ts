import pageView from "@/layouts/pageView.vue";
const routes = {
  path: "/",
  name: "Comp",
  component: pageView,
  redirect: "/lazyLoadimg",
  meta: {
    title: "组件",
  },
  children: [
    {
      path: "lazyLoadimg",
      name: "LazyLoadImg",
      component: () => import("@/pages/comp/component/lazy-load-img/index.vue"),
      meta: {
        title: "LazyLoadImg",
        menu: true,
      },
    },
    {
      path: "streamPrint",
      name: "StreamPrint",
      component: () => import("@/pages/comp/component/stream-print/index.vue"),
      meta: {
        title: "StreamPrint",
        menu: true,
      },
    },
    {
      path: "infiniteScroll",
      name: "InfiniteScroll",
      component: () =>
        import("@/pages/comp/component/infinite-scroll/index.vue"),
      meta: {
        title: "InfiniteScroll",
        menu: true,
      },
    },
    {
      path: "threeJs",
      name: "ThreeJs",
      component: () => import("@/pages/comp/component/threeJs/index.vue"),
      meta: {
        title: "ThreeJs",
        menu: true,
      },
    },
    {
      path: "scrollmore",
      name: "Scrollmore",
      component: () => import("@/pages/comp/component/scrollmore/index.vue"),
      meta: {
        title: "Scrollmore",
        menu: true,
      },
    },
    {
      path: "autoFrom",
      name: "AutoFrom",
      component: () => import("@/pages/comp/component/autoForm/index.vue"),
      meta: {
        title: "AutoFrom",
        menu: true,
      },
    },
    {
      path: "warefallFlow",
      name: "WarefallFlow",
      component: () =>
        import("@/pages/comp/component/warefall-flow/warefallFow.vue"),
      meta: {
        title: "WarefallFlow",
        menu: true,
      },
    },
    {
      path: "tagTextMixInput",
      name: "TagTextMixInput",
      component: () =>
        import("@/pages/comp/component/tag-text-mix-input/index.vue"),
      meta: {
        title: "TagTextMixInput",
        menu: true,
      },
    },
    {
      path: "xTable",
      name: "XTable",
      component: () => import("@/pages/comp/component/x-table/index.vue"),
      meta: {
        title: "XTable",
        menu: true,
      },
    },
    {
      path: "realMsg",
      name: "RealMsg",
      redirect: "/comp/realMsg/loginChat",
      meta: {
        title: "RealMsg",
        menu: true,
      },
      children: [
        {
          path: "loginChat",
          name: "LoginChat",
          component: () =>
            import("@/pages/comp/component/realMsg/loginChat.vue"),
          meta: {
            menu: false,
          },
        },
        {
          path: "chat",
          name: "Chat",
          component: () => import("@/pages/comp/component/realMsg/index.vue"),
          meta: {
            menu: false,
          },
        },
      ],
    },
  ],
};

export default routes;
