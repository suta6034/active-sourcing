import { createRouter, createWebHistory } from 'vue-router';

import {
    CATEGORIES,
    EVENTS,
    EVENTSPARAMETERS,
    tracking,
} from '../util/tracking/tracking';

import PageNotFound from '../views/PageNotFound.vue';
import ViewHome from '../views/ViewHome.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: ViewHome,
            beforeEnter: (to) => {
                if (to.query.loginSuccess) {
                    tracking({
                        event: EVENTS.login,
                        [EVENTSPARAMETERS.method]: CATEGORIES.method.activeSourcing,
                    });

                    router.push({ name: 'home' });
                }
            },
        },
        {
            path: '/candidate/:profileId',
            name: 'standalone',
            component: ViewHome,
        },
        {
            path: '/:catchAll(.*)',
            name: 'pageNotFound',
            component: PageNotFound,
        },
    ],
});

export default router;
