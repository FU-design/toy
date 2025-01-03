import pageView from '@/layouts/pageView.vue'
const routes = {
  path: '/comp',
  name: 'Comp',
  component: pageView,
  redirect: '/lazyLoadimg',
  meta: {
    title: '组件'
  },
  children: [
    {
      path: 'lazyLoadimg',
      name: 'LazyLoadImg',
      component: () => import('@/components/LazyLoadImg/index.vue'),
      meta: {
        title: 'LazyLoadImg',
        menu: true
      }
    },
    {
      path: 'streamPrint',
      name: 'StreamPrint',
      component: () => import('@/components/StreamPrint/index.vue'),
      meta: {
        title: 'StreamPrint',
        menu: true
      }
    },
    {
      path: 'infiniteScroll',
      name: 'InfiniteScroll',
      component: () => import('@/components/InfiniteScroll/index.vue'),
      meta: {
        title: 'InfiniteScroll',
        menu: true
      }
    },
    {
      path: 'scrollmore',
      name: 'Scrollmore',
      component: () => import('@/components/ScrollMore/index.vue'),
      meta: {
        title: 'Scrollmore',
        menu: true
      }
    },
    {
      path: 'autoForm',
      name: 'AutoForm',
      component: () => import('@/components/AutoForm/index.vue'),
      meta: {
        title: 'AutoFrom',
        menu: true
      }
    },
    {
      path: 'warefallFlow',
      name: 'WarefallFlow',
      component: () => import('@/components/WarefallFlow/WarefallFow.vue'),
      meta: {
        title: 'WarefallFlow',
        menu: true
      }
    },
    {
      path: 'tagTextMixInput',
      name: 'TagTextMixInput',
      component: () => import('@/components/TagTextMixInput/index.vue'),
      meta: {
        title: 'TagTextMixInput',
        menu: true
      }
    },
    {
      path: 'xTable',
      name: 'XTable',
      component: () => import('@/components/Xtable/index.vue'),
      meta: {
        title: 'XTable',
        menu: true
      }
    },
    {
      path: 'autoDnd',
      name: 'AutoDnd',
      component: () => import('@/components/AutoDnd/index.vue'),
      meta: {
        title: 'AutoDnd',
        menu: true
      }
    }
    // {
    //   path: "realMsg",
    //   name: "RealMsg",
    //   redirect: "/comp/realMsg/loginChat",
    //   meta: {
    //     title: "RealMsg",
    //     menu: true,
    //   },
    //   children: [
    //     {
    //       path: "loginChat",
    //       name: "LoginChat",
    //       component: () => import("@/components/real-msg/loginChat.vue"),
    //       meta: {
    //         menu: false,
    //       },
    //     },
    //     {
    //       path: "chat",
    //       name: "Chat",
    //       component: () => import("@/components/real-msg/index.vue"),
    //       meta: {
    //         menu: false,
    //       },
    //     },
    //   ],
    // },
  ]
}

export default routes
