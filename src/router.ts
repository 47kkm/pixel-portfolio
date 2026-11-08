import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import { findProject, profile } from './data/portfolio';

// GitHub Pages에서 새로고침해도 404가 나지 않도록 해시 라우팅을 쓴다.
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/projects/:no', component: () => import('./pages/ProjectPage.vue'), props: true },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, _from, saved) {
    if (to.hash) return { el: to.hash, top: 72, behavior: 'smooth' };
    if (saved) return saved;
    return { top: 0 };
  },
});

router.afterEach((to) => {
  const project = to.params.no ? findProject(Number(to.params.no)) : undefined;
  document.title = project ? `${project.title} · ${profile.name}` : `${profile.name} 포트폴리오`;
});
