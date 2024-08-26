import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
  // createWebHashHistory,
} from "vue-router";
import NotFound from "@/layouts/NotFound.vue";

const dynamicRouteFiles = import.meta.glob("./modules/**/*.ts", {
  eager: true,
});

const dynamicRoutes = mergeRouteModules(dynamicRouteFiles);

const routes: RouteRecordRaw[] = [
  ...dynamicRoutes,
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes,
});

router.beforeEach((_to, _from, next) => {
  // if (to.name != "LoginChat") {
  //   const auth = localStorage.getItem("auth");
  //   if (auth) {
  //     const { chatInfo } = JSON.parse(auth);
  //     if (chatInfo.chatCode && chatInfo.chatName && chatInfo.token) {
  //       next();
  //     } else {
  //       next({ name: "LoginChat" });
  //     }
  //   } else {
  //     next({ name: "LoginChat" });
  //   }
  // } else {
  //   next();
  // }
  next();
});

export default router;
