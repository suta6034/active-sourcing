import config from '../../../../../resource/config';
import type { MockEndpoint } from '../../../../../tests/drivers/types';
import { testData } from './data';

export const hasResults = (
    { mockEndpoint }: {mockEndpoint: MockEndpoint},
) => mockEndpoint(`http://localhost:3000${config.api.applicant.url}/search`, {
    httpVerb: 'post',
    body: {
        data: testData,
        meta: {
            pagination: {
                number: 1,
                size: 15,
                total: 20638,
                pages: 1376,
            },
        },
    },
});

export const hasNoResults = (
    { mockEndpoint }: {mockEndpoint: MockEndpoint},
) => mockEndpoint(`http://localhost:3000${config.api.applicant.url}/search`, {
    httpVerb: 'post',
    body: {
        data: [],
        meta: {
            pagination: {
                number: 1,
                size: 15,
                total: 20638,
                pages: 1376,
            },
        },
    },
});
