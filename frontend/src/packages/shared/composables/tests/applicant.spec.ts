import {
    expect,
    it,
    describe,
    vi,
} from '../../../../../tests/drivers/vitest/utils';
import type { Applicant, SearchTotalOptions } from '../../types/applicant/types';
import { useApplicant } from '../applicant';
import * as ApplicantService from '../../../applicant/repositories/applicant-repository';

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
};

const {
    search,
    applicantSearchData,
    applicants,
    getNextPage,
} = useApplicant();

describe.each([
    [0, {
        number: 0, pages: 1, total: 0, size: 15,
    }, false, false],
    [10, {
        number: 10, pages: 1, total: 10, size: 15,
    }, false, false],
    [10, {
        number: 15, pages: 1, total: 15, size: 15,
    }, true, false],
    [10, {
        number: 11, pages: 1, total: 11, size: 15,
    }, false, true],
    [10, {
        number: 16, pages: 1, total: 16, size: 15,
    }, true, true],
])('search', (numberOfApplicants, pagination, append, hasDuplicates) => {
    it(`should trigger a search where applicants are ${numberOfApplicants ? '' : 'not '}found, 
    the found result should ${append ? '' : 'not '}be appended, 
    the result data ${hasDuplicates ? 'contains' : 'doesnt contain'} duplicates`, async () => {
        const applicantsArray: Array<Applicant> = [];
        const oldData = [{
            attributes: {}, id: 'APPL1', meta: {}, type: 'applicant',
        }, {
            attributes: {}, id: 'APPL2', meta: {}, type: 'applicant',
        }, {
            attributes: {}, id: 'APPL3', meta: {}, type: 'applicant',
        }, {
            attributes: {}, id: 'APPL4', meta: {}, type: 'applicant',
        }, {
            attributes: {}, id: 'APPL5', meta: {}, type: 'applicant',
        }];
        applicants.value.data = oldData;
        for (let idx = 0; idx < numberOfApplicants; idx += 1) {
            applicantsArray.push({
                attributes: {}, id: `${idx + 1}`, meta: {}, type: 'applicant',
            });
        }
        if (hasDuplicates) {
            applicantsArray.push({
                attributes: {}, id: '1', meta: {}, type: 'applicant',
            });
        }
        const mockASSearch = vi.spyOn(ApplicantService, 'search').mockImplementation(async () => ({
            data: applicantsArray,
            meta: {
                pagination,
            },
            error: null,
        }));
        await search(emptyFilter, append);
        if (hasDuplicates) {
            applicantsArray.pop();
        }
        expect(applicantSearchData.value.isLoading).toBe(false);
        expect(applicants.value).toStrictEqual({
            data: append ? [...oldData, ...applicantsArray] : applicantsArray,
            meta: {
                pagination,
            },
            error: null,
        });
        let currItems = hasDuplicates ? numberOfApplicants + 1 : numberOfApplicants;
        if (append) {
            currItems += 5;
        }
        expect(applicantSearchData.value.currentItems).toBe(currItems);
        expect(applicantSearchData.value.total).toBe(pagination.total);
        mockASSearch.mockRestore();
    });
});
describe('getNextPage', () => {
    it('should increase the current page number and trigger search', async () => {
        applicantSearchData.value.currentPage = 1;
        getNextPage(emptyFilter);
        expect(applicantSearchData.value.currentPage).toBe(2);
    });
});
