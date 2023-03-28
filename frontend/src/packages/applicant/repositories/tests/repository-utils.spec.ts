import {
    expect,
    it,
    describe,
    vi,
} from '../../../../../tests/drivers/vitest/utils';
import { fetchJson, fetchResult } from '../repository-utils';

describe.each([[true], [false]])('fetchJson', (throwError) => {
    it(`where fetching data throws ${throwError ? 'an' : 'no'} error`, async () => {
        const r = new Response();
        Object.defineProperty(r, 'ok', {
            value: !throwError,
        });
        const json = {
            data: 'UNIT TEST DATA',
        };
        const mockJson = vi.spyOn(r, 'json').mockImplementation(() => Promise.resolve(json));
        const mockFetch = vi.spyOn(window, 'fetch').mockImplementation(() => {
            if (throwError) {
                throw Error('Unit Test Error');
            }
            return Promise.resolve(r);
        });
        const logErrorMock = vi.fn();
        const logError = window.console.error;
        window.console.error = logErrorMock;
        const result = await fetchJson({
            path: '',
            headers: {},
            method: 'GET',
        });
        expect(mockFetch).toBeCalledTimes(1);
        expect(mockJson).toBeCalledTimes(throwError ? 0 : 1);
        expect(result).toBe(throwError ? null : json.data);
        mockFetch.mockRestore();
        window.console.error = logError;
    });
});
describe.each([[true], [false]])('fetchResult', (throwError) => {
    it(`where fetching data throws ${throwError ? 'an' : 'no'} error`, async () => {
        const r = new Response();
        Object.defineProperty(r, 'ok', {
            value: !throwError,
        });
        const json = {
            data: 'UNIT TEST DATA',
        };
        const mockJson = vi.spyOn(r, 'json').mockImplementation(() => Promise.resolve(json));
        const mockFetch = vi.spyOn(window, 'fetch').mockImplementation(() => {
            if (throwError) {
                throw Error('Unit Test Error');
            }
            return Promise.resolve(r);
        });
        const logErrorMock = vi.fn();
        const logError = window.console.error;
        window.console.error = logErrorMock;
        const result = await fetchResult({
            path: '',
            headers: {},
            method: 'GET',
        });
        expect(mockFetch).toBeCalledTimes(1);
        expect(mockJson).toBeCalledTimes(throwError ? 0 : 1);
        expect(result).toStrictEqual(throwError ? {
            data: [],
            meta: null,
            error: {
                level: 'major',
                name: 'Unit Test Error',
                status: 503,
            },
        } : { data: 'UNIT TEST DATA', error: null, meta: undefined });
        mockFetch.mockRestore();
        window.console.error = logError;
    });
});
