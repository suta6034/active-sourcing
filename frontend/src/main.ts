import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import './index.css';

(async () => {
    if (process.env.NODE_ENV === 'development') {
        const { mockEndpoint, activateStoredMocks } = await import('./__test__/mock-endpoint');
        window.mockEndpoint = mockEndpoint;

        activateStoredMocks();
        // Do not remove: Mocking own data for the testing purpose
        // const filter = await import('./packages/applicant/__test__/preconditions/filter');
        // filter.validLocation({
        //     mockEndpoint,
        // });
    }

    const app = createApp(App);

    app.use(router);
    app.mount('#app');
})();
