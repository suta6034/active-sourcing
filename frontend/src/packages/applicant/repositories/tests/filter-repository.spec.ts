import {
    expect,
    it,
    describe,
    vi,
} from '../../../../../tests/drivers/vitest/utils';
import { getAllFilterLabels, validateLocation } from '../filter-repository';

import * as utils from '../repository-utils';

const CSRF_TOKEN = document.cookie.replace(/(?:^|.*;\s*)ASP-XSRF-TOKEN\s*=\s*([^;]*).*$|^.*$/, '$1');

const LABELS_ENDPOINT = import.meta.env.VITE_API_LABELS;
const LOCATION_ENDPOINT = import.meta.env.VITE_API_LOCATION;

describe('getAllFilterLabels', () => {
    it('should return the data which is retrieved with fetchResult', async () => {
        const data = {
            data: [{ name: 'UNIT TEST FILTER', items: [{ id: 1, label: 'LABEL 1' }, { id: 2, label: 'LABEL 2' }] }],
            error: null,
        };
        const mockFetchResult = vi.spyOn(utils, 'fetchResult').mockImplementation(() => Promise.resolve(data));
        const result = await getAllFilterLabels('de');
        expect(result).toStrictEqual(data);
        expect(mockFetchResult).toBeCalledTimes(1);
        expect(mockFetchResult.mock.calls[0][0]).toStrictEqual({
            path: `${LABELS_ENDPOINT}?lang=de`,
            headers: {
                'Content-Type': 'application/json;',
                'ASP-X-XSRF-TOKEN': CSRF_TOKEN,
            },
            method: 'GET',
        });
        mockFetchResult.mockRestore();
    });
});
describe('validateLocation', () => {
    it('should return the data which is retrieved with fetchResult', async () => {
        const data = {
            data: {
                valid: true,
            },
            error: null,
        };
        const mockFetchResult = vi.spyOn(utils, 'fetchResult').mockImplementation(() => Promise.resolve(data));
        const result = await validateLocation('Linz');
        expect(result).toStrictEqual(data);
        expect(mockFetchResult).toBeCalledTimes(1);
        expect(mockFetchResult.mock.calls[0][0]).toStrictEqual({
            path: `${LOCATION_ENDPOINT}/valid`,
            headers: {
                'Content-Type': 'application/json;',
                'ASP-X-XSRF-TOKEN': CSRF_TOKEN,
            },
            method: 'POST',
            body: JSON.stringify({
                location: 'Linz',
            }),
        });
        mockFetchResult.mockRestore();
    });
});
