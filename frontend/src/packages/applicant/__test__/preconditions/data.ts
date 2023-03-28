export const testData = [
    {
        id: 'test id',
        attributes: {
            objective: {
                jobs: ['teamleader'],
                location: {
                    preferredWorkplaces: [{ label: 'test label' }],
                },
            },
            lastPosition: {
                title: 'foo', company: 'bar',
            },
        },
    },
    {
        id: 'test id 2',
        attributes: {
            lastPosition: {
                experienceMonths: 1,
            },
        },
    },
    {
        id: 'test id 3',
        attributes: {
            lastPosition: {
                experienceMonths: 12,
            },
        },
    },
    {
        id: 'test id 4',
        attributes: {
            lastPosition: {
                experienceMonths: 6,
            },
        },
    },
    {
        id: 'test id 5',
        attributes: {
            lastPosition: {
                experienceMonths: 876,
            },
        },
    },
    {
        id: 'test id 6',
        attributes: {
            objective: {
                location: {
                    readyToMove: true,
                },
            },
            lastPosition: {},
        },
    },
    {
        id: 'test id 7',
        attributes: {
            objective: {
                location: {
                    preferredWorkplaces: [{ label: 'test city' }], readyToMove: true,
                },
            },
            lastPosition: {
                jobFieldId: 'Management',
            },
        },
    },
];

export const testDataAutocompletionKeyword = [
    'Java',
    'Java Entwickler',
    'Java Software Entwickler',
    'Java Developer',
    'Java Web Entwickler',

];

export const testDataAutocompletionLocation = [
    'Linz',
    'Linz-Land (Bezirk)',
    'Lindau',
    'Lindau (Bodensee)',
    'Lingen (Ems)',
];
