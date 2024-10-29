import pageView from '@/layouts/pageView.vue';
const routes = {
  path: '/',
  name: 'Issue',
  component: pageView,
  redirect: '/git',
  meta: {
    title: '问题'
  },
  children: [
    {
      path: 'git',
      name: 'Git',
      component: () => import('@/pages/issueTracker/git/index.vue'),
      meta: {
        title: 'Git',
        menu: true
      }
    }
  ]
};

export default routes;
