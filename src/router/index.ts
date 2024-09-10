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

export default router;
