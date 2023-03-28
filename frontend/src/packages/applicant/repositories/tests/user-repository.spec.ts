import {
    expect,
    it,
    describe,
    vi,
} from '../../../../../tests/drivers/vitest/utils';

import * as utils from '../repository-utils';
import { getUserInfo } from '../user-repository';

const ENDPOINT = import.meta.env.VITE_API_USERINFO;

describe.each([[false], [true]])('getUserInfo', (getData) => {
    it(`should call fetchJson and ${getData ? 'valid data' : 'null'}`, async () => {
        const testUserData = {
            firstName: 'Max',
            lastName: 'Mustermann',
            initials: 'MM',
            profilePictureUrl: 'http://myUrl.at',
            company: {
                name: 'Fantasy Company GmbH',
                address: 'Somewhere',
            },
        };
        const mockFetchJson = vi.spyOn(utils, 'fetchJson').mockImplementation(() => {
            if (getData) {
                return Promise.resolve(testUserData);
            }
            return Promise.resolve(null);
        });
        const result = await getUserInfo();
        expect(mockFetchJson).toBeCalledTimes(1);
        expect(mockFetchJson.mock.calls[0][0]).toStrictEqual({
            path: ENDPOINT,
            headers: {
                'Content-Type': 'application/json;',
            },
            method: 'GET',
        });
        expect(result).toBe(getData ? testUserData : null);
        mockFetchJson.mockRestore();
    });
});
