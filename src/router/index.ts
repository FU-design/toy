import { createRouter, createWebHistory } from "vue-router";
import pageView from "../layout/pageView.vue";
import comp from "./modules/comp";
import question from "./modules/question";
import minecraft from "./modules/minecraft";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: pageView,
      redirect: "/workplace",
      meta: {
        title: "工作台",
      },
      children: [
        {
          path: "/workplace",
          name: "WorkPlace",
          component: () => import("../pages/workplace.vue"),
          meta: {
            title: "工作台",
          },
        },
      ],
    },
    comp,
    question,
    minecraft,
  ],
});

export default router;
