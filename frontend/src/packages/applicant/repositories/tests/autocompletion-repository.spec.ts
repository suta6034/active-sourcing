import {
    expect,
    it,
    describe,
    vi,
} from '../../../../../tests/drivers/vitest/utils';
import * as utils from '../repository-utils';

import { getAutocompletion } from '../autocompletion-repository';

const ENDPOINT = import.meta.env.VITE_API_AUTOCOMPLETE;

describe.each([[false], [true]])('getAutocompletion', (getData) => {
    it(`should call fetchJson and return the result where fetchJson returns 
        ${getData ? 'valid data' : '"null"'}`, async () => {
        const data = ['DATA 1', 'DATA 2', 'DATA 3'];
        const mockFetchJson = vi.spyOn(utils, 'fetchJson').mockImplementation(() => {
            if (getData) {
                return Promise.resolve(data);
            }
            return Promise.resolve(null);
        });
        const result = await getAutocompletion('TYPE', 'VALUE');
        expect(result).toStrictEqual(getData ? data : []);
        expect(mockFetchJson).toBeCalledTimes(1);
        expect(mockFetchJson.mock.calls[0][0]).toStrictEqual({
            path: `${ENDPOINT}/TYPE?prefix=VALUE`,
            headers: {
                'Content-Type': 'application/json;',
            },
            method: 'GET',
        });
        mockFetchJson.mockRestore();
    });
});
