import config from '../../../../../resource/config';
import type { MockEndpoint } from '../../../../../tests/drivers/types';

export const filterLabels = [
    {
        name: 'educationGroups',
        items: [
            {
                id: 1,
                label: 'hauptschule',
            },
        ],
    },
    {
        name: 'branches',
        items: [
            {
                id: 2,
                label: 'finanz',
            },
        ],
    },
    {
        name: 'employmentTypes',
        items: [
            {
                id: 3960,
                label: 'Vollzeit',
            },
            {
                id: 3961,
                label: 'Teilzeit',
            },
        ],
    },
    {
        name: 'jobFields',
        items: [
            {
                id: 3090,
                label: 'Consulting',
            },
        ],
    },
    {
        name: 'keywordFilters',
        items: [
            {
                label: 'Wunschjob',
                id: 2,
            },
        ],
    },
    {
        name: 'languages',
        items: [
            {
                label: 'Deutsch',
                id: 1,
            },
            {
                label: 'Englisch',
                id: 2,
            },
            {
                label: 'Spanisch',
                id: 3,
            },
        ],
    },
    {
        name: 'languageLevels',
        items: [
            {
                label: 'Alle',
                id: 1,
            },
            {
                label: 'Grundkenntnisse',
                id: 2,
            },
            {
                label: 'Gut',
                id: 3,
            },
            {
                label: 'Fließend',
                id: 4,
            },
            {
                label: 'Muttersprache',
                id: 5,
            },
        ],
    },
];
export const hasFilterLabels = (
    { mockEndpoint }:{mockEndpoint:MockEndpoint},
) => mockEndpoint(`http://localhost:3000${config.api.labels.url}`, {
    httpVerb: 'get',
    body: () => ({
        data: filterLabels,
    }),
});

export const validLocation = (
    { mockEndpoint }: {mockEndpoint: MockEndpoint},
) => mockEndpoint(`http://localhost:3000${config.api.location.url}/valid`, {
    httpVerb: 'post',
    body: {
        data: {
            valid: true,
        },
    },
});
