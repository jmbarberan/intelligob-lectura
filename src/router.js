import { createRouter, createWebHistory } from 'vue-router';

import LoginView from './views/Login.vue'
import DeviceAuthView from './views/DeviceAuthorization.vue'
import Home from './components/Home.vue'

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/login',
          name: 'login',
          component: LoginView,
          meta: {
            public: true,
            onlyWhenLoggedOut: true
          }
        },
        {
          path: '/device-auth',
          name: 'device',
          component: DeviceAuthView,
          meta: {
            public: true,
            onlyWhenLoggedOut: true
          }
        },
        {
          path: '/issue',
          name: 'issue',
          component: () => import(/* webpackChunkName: "issue" */ './views/IssueReport.vue')
        },
        {
          path: '/reading-input',
          name: 'reading',
          component: () => import(/* webpackChunkName: "reading" */ './views/IssueReport.vue')
        },
    ]
});

router.beforeEach(async (to, from, next) => {
    const alertStore = useAlertStore();
    alertStore.clear(   );

    const isPublic = to.matched.some(record => record.meta.public)
    const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
    const loggedIn = !!TokenService.getToken();

    if (!isPublic && !loggedIn) {
        return next({
        path:'/login',
        query: {redirect: to.fullPath}
        });
    }

    if (loggedIn && onlyWhenLoggedOut) {
        return next('/')
    }

    next();
});

/*router.beforeEach((to, from, next) => {
  
})*/
