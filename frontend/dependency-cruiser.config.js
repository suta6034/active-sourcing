/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
    forbidden: [
        {
            name: 'not-from-non-router-to-views',
            comment: `
                Views should only ever be used by the router. If the need arises to use a view in a different context
                the particular component probably is no view.
            `,
            severity: 'error',
            from: {
                path: '^src/',
                pathNot: [
                    '^src/router/index\\.ts',
                    '^src/.*?\\.(spec|test)\\.ts',
                ],
            },
            to: {
                path: '^src/views/',
            },
        },
        {
            name: 'not-from-non-view-components-to-layouts',
            comment: `
                Only view components are allowed to depend on layouts. Layout components are meant to only represent
                particular page layouts.
            `,
            severity: 'error',
            from: {
                pathNot: [
                    '^src/views/',
                    '^src/.*?\\.(spec|test)\\.ts',
                ],
            },
            to: {
                path: '^src/components/layouts/',
            },
        },
        {
            name: 'not-from-packages-to-non-shared-package',
            comment: `
                Packages are not allowed to use any code outside of their scope except from the \`shared\` package. That
                way packages are (mostly) self contained which should make them easier to understand. Also, knowing that
                other packages can not depend on a particular package makes refactoring easier because it reduces the
                scope that needs to be considered. Another benefit is that each package can be relatively easy extracted
                into a separate project if the need arises.
            `,
            severity: 'error',
            from: {
                path: '(^src/packages/.*?/components)([^/]+)/',
            },
            to: {
                path: '^src/',
                pathNot: [
                    '^src/packages/shared/',
                    '$1$2',
                ],
            },
        },
        {
            name: 'not-from-utils-to-business-logic',
            comment: `
                Utils should be generic, straightforward helper functions. If the need arises that one utility function
                depends on something that is not another utility function, it probably is not a utility function but
                something more important.
            `,
            severity: 'error',
            from: {
                path: '^src/.*?/utils/',
                pathNot: '^src/.*?\\.(spec|test)\\.ts',
            },
            to: {
                path: '^src/',
                pathNot: '^src/.*?/utils/',
            },
        },
        {
            name: 'no-circular',
            severity: 'warn',
            from: {},
            to: {
                circular: true,
            },
        },
        {
            name: 'no-orphans',
            severity: 'error',
            from: {
                orphan: true,
                pathNot: [
                    '(^|/)\\.[^/]+\\.(js|cjs|mjs|ts|json)$',
                    '\\.d\\.ts$',
                    '(^|/)tsconfig\\.json$',
                    '(^|/)(vite|vitest)\\.config\\.(js|cjs|mjs|ts|json)$',
                    'theme.js',
                    'src/packages/shared/assets',
                ],

            },
            to: {},
        },
        {
            name: 'not-to-deprecated',
            severity: 'warn',
            from: {},
            to: {
                dependencyTypes: [
                    'deprecated',
                ],
            },
        },
        {
            name: 'not-to-spec',
            severity: 'error',
            from: {},
            to: {
                path: '\\.(spec|test)\\.(js|mjs|cjs|ts|ls|coffee|litcoffee|coffee\\.md)$',
            },
        },
    ],
    options: {
        tsPreCompilationDeps: true,
        tsConfig: {
            fileName: 'tsconfig.json',
        },
        doNotFollow: {
            path: 'node_modules',
            dependencyTypes: [
                'npm',
                'npm-dev',
                'npm-optional',
                'npm-peer',
                'npm-bundled',
                'npm-no-pkg',
            ],
        },
        enhancedResolveOptions: {
            exportsFields: ['exports'],
            conditionNames: ['import', 'require', 'node', 'default'],
        },
    },
};
