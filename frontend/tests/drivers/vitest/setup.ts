import matchers from '@testing-library/jest-dom/matchers';
import {
    afterAll,
    afterEach,
    beforeAll,
    expect,
} from 'vitest';
import { fetch } from 'cross-fetch';

import { mockServer } from './utils';

global.fetch = fetch;

expect.extend(matchers);

beforeAll(() => mockServer.listen({ onUnhandledRequest: 'error' }));
afterAll(() => mockServer.close());
afterEach(() => {
    // eslint-disable-next-line no-undef
    window.document.body.innerHTML = '';
    mockServer.resetHandlers();
});
