import { rest } from 'msw';
// eslint-disable-next-line import/extensions
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import type { VueWrapper } from '@vue/test-utils';
import type { ComponentPublicInstance } from 'vue';
import { render as renderOriginal, type RenderOptions } from '@testing-library/vue';
import type { MockEndpoint } from '../types';
import router from '../../../src/router';

export const user = userEvent.setup();
export { screen } from '@testing-library/vue';
export {
    it,
    expect,
    describe,
    vi,
    beforeEach,
    afterEach,
    type SpyInstance,
} from 'vitest';
export { flushPromises } from '@vue/test-utils';
export { fireEvent } from '@testing-library/dom';
export const mockServer = setupServer();
export const mockEndpoint: MockEndpoint = (endpoint, {
    body: bodyOrGetBody,
    httpVerb = 'get',
    status = 200,
}) => {
    const getBody = typeof bodyOrGetBody === 'function' ? bodyOrGetBody : () => bodyOrGetBody;
    mockServer.use(
        rest[httpVerb](endpoint, (req, res, ctx) => res(
            ctx.status(status),
            ctx.json(getBody({ searchParams: req.url.searchParams })),
        )),
    );
};

export const render = (component, options?: RenderOptions, stubs?: Record<string, Record<string, string>>) => {
    const x = renderOriginal(component, { ...options, global: { plugins: [router], stubs } });
    return x;
};

export type GenericWrapper<T> = VueWrapper<ComponentPublicInstance & T>;
