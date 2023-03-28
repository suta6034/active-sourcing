// eslint-disable-next-line import/extensions,import/no-unresolved
import { defineConfig } from 'vitest/config';
import viteConfig from '../../../vite.config';

export default defineConfig(() => ({
    ...viteConfig(),
    test: {
        environment: 'jsdom',
        include: ['./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        coverage: {
            functions: 80,
            branches: 80,
            reporter: ['text', 'html', 'lcov'],
            reportsDirectory: './tests/drivers/vitest/coverage',
            all: true,
            src: ['./src'],
            exclude: [
                '**/__test__/**/*',
                '**/.eslintrc*',
                '**/*.spec.ts',
                'tests/**/*',
                'src/theme.js',
                '**/types.ts',
                'router/**/*',
                'src/App.vue',
                'src/main.ts',
                'src/packages/shared/assets',
                'src/stories',
                'src/util/tracking',
            ],
        },
        setupFiles: ['./tests/drivers/vitest/setup.ts'],
    },
}));
