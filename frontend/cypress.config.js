const { defineConfig } = require('cypress');
const { on } = require('events');

const { downloadFile } = ('cypress-downloadfile/lib/addPlugin');

const baseUrl_activesourcingstaging = 'https://active-sourcing-platform.staging.karriere.at/';

module.exports = defineConfig({
    e2e: {
        defaultCommandTimeout: 3000,
        baseUrl: baseUrl_activesourcingstaging,
        setupNodeEvents(on, config) {
            on('task', { downloadFile });
        },
        chromeWebSecurity: false //set to false until login problem is fixed
    },
});
