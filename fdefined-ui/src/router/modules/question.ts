import pageView from "@/layout/pageView.vue";

const question = {
  path: "/",
  name: "Question",
  component: pageView,
  redirect: "/questionplace",
  meta: {
    title: "疑难杂症",
  },
  children: [
    {
      path: "questionplace",
      name: "QuestionPlace",
      component: () => import("@/pages/question/answer.vue"),
      meta: {
        title: "疑难杂症",
      },
    },
  ],
};

export default question;
