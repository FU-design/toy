import {
  createRouter,
  createWebHistory,
  // createWebHashHistory,
} from "vue-router";
import NotFound from "@/layout/NotFound.vue";
import comp from "./modules/comp";
import question from "./modules/question";
import minecraft from "./modules/minecraft";
const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes: [
    comp,
    question,
    minecraft,
    // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
});

export default router;
