import pageView from "@/layouts/pageView.vue";
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
      path: "lazyLoadImg",
      name: "LazyLoadImg",
      component: () => import("@/pages/comp/component/lazy-load-img/index.vue"),
      meta: {
        title: "LazyLoadImg",
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
      path: "canvas",
      name: "Canvas",
      component: () => import("@/pages/comp/component/canvas/index.vue"),
      meta: {
        title: "Canvas",
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
      path: "aichat",
      name: "AIChat",
      component: () => import("@/pages/comp/component/ai-chat/index.vue"),
      meta: {
        title: "AIChat",
        menu: true,
      },
    },
    // {
    //   path: "flowable",
    //   name: "Flowable",
    //   component: () =>
    //     import("@/pages/comp/component/antvx6-flowable/index.vue"),
    //   meta: {
    //     title: "Flowable",
    //     menu: true,
    //   },
    // },
    // {
    //   path: "scrollmore",
    //   name: "Scrollmore",
    //   component: () => import("@/pages/comp/component/scrollmore/index.vue"),
    //   meta: {
    //     title: "Scrollmore",
    //     menu: true,
    //   },
    // },
    // {
    //   path: "autoFrom",
    //   name: "AutoFrom",
    //   component: () => import("@/pages/comp/component/autoForm/index.vue"),
    //   meta: {
    //     title: "AutoFrom",
    //     menu: true,
    //   },
    // },
    // {
    //   path: "warefallFlow",
    //   name: "WarefallFlow",
    //   component: () =>
    //     import("@/pages/comp/component/warefallFlow/warefallFow.vue"),
    //   meta: {
    //     title: "WarefallFlow",
    //     menu: true,
    //   },
    // },
    // {
    //   path: "tagTextMixInput",
    //   name: "TagTextMixInput",
    //   component: () =>
    //     import("@/pages/comp/component/tagTextMixInput/index.vue"),
    //   meta: {
    //     title: "TagTextMixInput",
    //     menu: true,
    //   },
    // },
    {
      path: "xTable",
      name: "XTable",
      component: () => import("@/pages/comp/component/xTable/index.vue"),
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

export default comp;
