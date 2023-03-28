import { allFiltersLabels } from '../../../applicant/repositories/filter-repository';
import {
    expect,
    it,
    describe,
} from '../../../../../tests/drivers/vitest/utils';
import { useFilter } from '../filter';
import type { FilterLabel, SearchTotalOptions } from '../../types/applicant/types';

const {
    filter,
    updateFilter,
    resetModalFilter,
    getLabelForFilter,
} = useFilter();

const localFilter: SearchTotalOptions = {
    branches: [],
    educationGroups: [1111],
    employmentTypes: [3960],
    exactSearch: false,
    experienceMonths: {
        from: undefined,
        to: undefined,
    },
    jobFields: [],
    experiences: [],
    keyword: '',
    keywordFilters: [],
    languages: [],
    location: {
        name: '',
        radius: 0,
        readyToMove: true,
    },
    salary: {
        from: undefined,
        to: undefined,
    },
    willingnessToTravel: 0,
    homeoffice: 0,
};

const emptyFilter: SearchTotalOptions = {
    branches: [],
    educationGroups: [],
    employmentTypes: [],
    exactSearch: false,
    experienceMonths: {
        from: undefined,
        to: undefined,
    },
    jobFields: [],
    experiences: [],
    keyword: '',
    keywordFilters: [],
    languages: [],
    location: {
        name: '',
        radius: 0,
        readyToMove: null,
    },
    salary: {
        from: undefined,
        to: undefined,
    },
    willingnessToTravel: 0,
    homeoffice: 0,
};

const templateFilterLabels: FilterLabel[] = [
    {
        name: 'availability',
        items: [
            {
                id: 1,
                label: 'Keine Angabe',
            },
            {
                id: 2,
                label: 'Ab sofort',
            },
            {
                id: 3,
                label: 'In 1 Monat',
            },
            {
                id: 4,
                label: 'In 2 Monaten',
            },
            {
                id: 5,
                label: 'In 3 Monaten',
            },
            {
                id: 6,
                label: 'In 4 Monaten',
            },
            {
                id: 7,
                label: 'In 5 Monaten',
            },
            {
                id: 8,
                label: 'In 6 Monaten',
            },
            {
                id: 9,
                label: '> 6 Monate',
            },
        ],
    },
    {
        name: 'educationGroups',
        items: [
            {
                id: 4084,
                label: 'Uni-Abschluss',
            },
            {
                id: 4083,
                label: 'FH-Abschluss',
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
            {
                id: 9999,
            },
        ],
    },
    {
        name: 'branches',
        items: [
            {
                id: 4000,
                label: 'Banken, Finanz, Versicherung',
            },
            {
                id: 4001,
                label: 'Bau, Immobilien, Haustechnik',
            },
        ],
    },
    {
        name: 'jobFields',
        items: [
            {
                id: 3085,
                label: 'Assistenz, Verwaltung',
            },
            {
                id: 3090,
                label: 'Beratung, Consulting',
            },
        ],
    },
    {
        name: 'experiences',
        items: [],
    },
    {
        name: 'emptyFilter',
        items: [],
    },
];

it('update filter options', () => {
    // add
    filter.value = JSON.parse(JSON.stringify(emptyFilter));
    updateFilter({ group: 'educationGroups', id: 1111 });
    let expectedObject: SearchTotalOptions = JSON.parse(JSON.stringify(emptyFilter));
    expectedObject.educationGroups = [1111];
    expect(filter.value).toStrictEqual(expectedObject);

    // remove
    updateFilter({ group: 'educationGroups', id: 1111 });
    expectedObject = {
        ...expectedObject,
        educationGroups: [],
    };
    expect(filter.value).toStrictEqual(expectedObject);
});

it('reset filter options', () => {
    // add
    filter.value = Object.create(localFilter);
    resetModalFilter();
    const expectedObject = {
        branches: [],
        educationGroups: [],
        employmentTypes: [],
        exactSearch: false,
        experienceMonths: {
            from: undefined,
            to: undefined,
        },
        jobFields: [],
        experiences: [],
        keywordFilters: [],
        languages: [],
        location: {
            name: '',
            readyToMove: true,
            radius: 0,
        },
        salary: {
            from: undefined,
            to: undefined,
        },
        willingnessToTravel: 0,
        homeoffice: 0,
    };
    expect(filter.value).toStrictEqual(expectedObject);
});

describe('updateFilter', () => {
    it('should return false if group is invalid', () => {
        filter.value = JSON.parse(JSON.stringify(emptyFilter));
        expect(updateFilter({ group: 'INVALID_GROUP', id: 1 })).toBe(false);
    });
    it('should add value to an existing empty educationGroups filter', () => {
        filter.value = JSON.parse(JSON.stringify(emptyFilter));
        const expectedObject = JSON.parse(JSON.stringify(emptyFilter));
        expect(updateFilter({ group: 'educationGroups', id: '12345' })).toBe(true);
        expectedObject.educationGroups = ['12345'];
        expect(filter.value).toStrictEqual(expectedObject);
    });
    it('should add value to an existing prefilled educationGroups filter', () => {
        filter.value = JSON.parse(JSON.stringify(emptyFilter));
        filter.value.educationGroups = [1];
        const expectedObject: SearchTotalOptions = JSON.parse(JSON.stringify(emptyFilter));
        expectedObject.educationGroups = [1, 12345];
        expect(updateFilter({ group: 'educationGroups', id: 12345 })).toBe(true);
        expect(filter.value).toStrictEqual(expectedObject);
    });
    it('should remove a value from an existing prefilled educationGroups filter', () => {
        filter.value = JSON.parse(JSON.stringify(emptyFilter));
        filter.value.educationGroups = [12345];
        const expectedObject: SearchTotalOptions = JSON.parse(JSON.stringify(emptyFilter));
        expect(updateFilter({ group: 'educationGroups', id: 12345 })).toBe(true);
        expect(filter.value).toStrictEqual(expectedObject);
    });
    it('should set the according value to an existing range filter', () => {
        filter.value = JSON.parse(JSON.stringify(emptyFilter));
        updateFilter({
            group: 'salary', id: 100, key: 'to',
        });
        const expectedObject: SearchTotalOptions = JSON.parse(JSON.stringify(emptyFilter));
        expectedObject.salary.to = 100;
        expect(filter.value).toStrictEqual(expectedObject);
        updateFilter({
            group: 'salary', id: 100, key: 'from',
        });
        expectedObject.salary.from = 100;
        expect(filter.value).toStrictEqual(expectedObject);
        updateFilter({
            group: 'salary', id: undefined, key: 'to',
        });
        expectedObject.salary.to = undefined;
        expect(filter.value).toStrictEqual(expectedObject);
        updateFilter({
            group: 'salary', id: undefined, key: 'from',
        });
        expectedObject.salary.from = undefined;
        expect(filter.value).toStrictEqual(expectedObject);
    });
    it('should set the given value to a string filter', () => {
        filter.value = JSON.parse(JSON.stringify(emptyFilter));
        expect(updateFilter({ group: 'keyword', id: 'KEYWORD' })).toBe(true);
        expect(filter.value.keyword).toStrictEqual('KEYWORD');
        expect(updateFilter({ group: 'keyword', id: '' })).toBe(true);
        expect(filter.value.keyword).toStrictEqual('');
    });
    it('should set the given array to the language filter', () => {
        filter.value = JSON.parse(JSON.stringify(emptyFilter));
        const expectedObject: SearchTotalOptions = JSON.parse(JSON.stringify(emptyFilter));
        const languages = [{ id: 10, level: 20 }, { id: 20, level: 30 }];
        expectedObject.languages = languages;
        expect(updateFilter({ group: 'languages', id: languages })).toBe(true);
        expect(filter.value).toStrictEqual(expectedObject);
    });
});

describe('getLabelForFilter', () => {
    it('should return empty string if "allFiltersLabels" is empty', () => {
        allFiltersLabels.value = [];
        expect(getLabelForFilter('educationGroups', 4084)).toStrictEqual('');
    });
    it('should return an empty string if the given filter name is invalid', () => {
        allFiltersLabels.value = templateFilterLabels;
        expect(getLabelForFilter('INVALID_FILTER_NAME', 4084)).toStrictEqual('');
    });
    it('should return an empty string if the given filter name has no items saved', () => {
        allFiltersLabels.value = templateFilterLabels;
        expect(getLabelForFilter('emptyFilter', 4084)).toStrictEqual('');
    });
    it('should return an empty string if no filter item with the given id is found', () => {
        allFiltersLabels.value = templateFilterLabels;
        expect(getLabelForFilter('employmentTypes', 1234)).toStrictEqual('');
    });
    it('should return an empty string if the found filter item has no label set', () => {
        allFiltersLabels.value = templateFilterLabels;
        expect(getLabelForFilter('employmentTypes', 9999)).toStrictEqual('');
    });
    it('should return the label of the found filter item', () => {
        allFiltersLabels.value = templateFilterLabels;
        expect(getLabelForFilter('employmentTypes', 3960)).toStrictEqual('Vollzeit');
    });
});
