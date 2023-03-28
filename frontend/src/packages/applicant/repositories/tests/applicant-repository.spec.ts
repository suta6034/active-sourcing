import {
    expect,
    it,
    describe,
    vi,
} from '../../../../../tests/drivers/vitest/utils';

import * as utils from '../repository-utils';
import { getProfileData, search } from '../applicant-repository';
import * as tracking from '../../../../util/tracking/tracking';
import type { ProfileData } from '../../../shared/types/profile/types';

const CSRF_TOKEN = document.cookie.replace(/(?:^|.*;\s*)ASP-XSRF-TOKEN\s*=\s*([^;]*).*$|^.*$/, '$1');

const ENDPOINT = import.meta.env.VITE_API_APPLICANT;

describe('search', () => {
    it('should return the data which is fetched with fetchResult and track the current search', async () => {
        const mockTracking = vi.spyOn(tracking, 'tracking').mockImplementation(() => undefined);
        const mockGetTrackingCategories = vi.spyOn(tracking, 'getAllCategoriesInString')
            .mockImplementation(() => 'TRACKING_CATEGORIES');
        const expectedResult = {
            data: [],
            meta: {
                pagination: {
                    number: 1,
                    pages: 10,
                    size: 15,
                    total: 150,
                },
            },
            error: null,
        };
        const mockFetchResult = vi.spyOn(utils, 'fetchResult')
            .mockImplementation(() => Promise.resolve(expectedResult));
        const result = await search({
            branches: [],
            educationGroups: [],
            employmentTypes: [],
            experienceMonths: {
                from: undefined,
                to: undefined,
            },
            jobFields: [],
            experiences: [],
            keyword: 'Java',
            keywordFilters: [1],
            languages: [],
            location: {
                name: 'Linz',
                radius: 0,
                readyToMove: true,
            },
            salary: {
                from: undefined,
                to: undefined,
            },
            exactSearch: false,
            willingnessToTravel: 0,
            homeoffice: 0,
        }, 1);
        expect(result).toStrictEqual(expectedResult);
        expect(mockTracking).toBeCalledTimes(1);
        expect(mockGetTrackingCategories).toBeCalledTimes(1);
        expect(mockFetchResult).toBeCalledTimes(1);
        expect(mockTracking.mock.calls[0][0]).toStrictEqual({
            event: tracking.EVENTS.search,
            search_term: null,
            [tracking.EVENTSPARAMETERS.keywords]: 'java',
            [tracking.EVENTSPARAMETERS.locations]: 'linz',
            [tracking.EVENTSPARAMETERS.filters]: 'TRACKING_CATEGORIES',
            form_type: tracking.CATEGORIES[tracking.EVENTSPARAMETERS.view_type].candidateSearch,
        });
        expect(mockGetTrackingCategories.mock.calls[0][0]).toStrictEqual({
            eventParameter: 'filters',
            categories: {
                experienceJobfield: false,
                experienceYears: false,
                employment: false,
                salary: false,
                branch: false,
                education: false,
                language: undefined,
                readyToMove: true,
                exactSearch: false,
                searchInFilter: true,
                willingnessToTravel: false,
                homeoffice: false,
            },
        });
        expect(mockFetchResult.mock.calls[0][0]).toStrictEqual({
            path: `${ENDPOINT}/search`,
            headers: {
                'Content-Type': 'application/json;',
                'ASP-X-XSRF-TOKEN': CSRF_TOKEN,
            },
            method: 'POST',
            body: JSON.stringify({
                branches: [],
                educationGroups: [],
                employmentTypes: [],
                experienceMonths: {
                    from: undefined,
                    to: undefined,
                },
                jobFields: [],
                experiences: [],
                keyword: 'Java',
                keywordFilters: [1],
                languages: [],
                location: {
                    name: 'Linz',
                    radius: 0,
                    readyToMove: true,
                },
                page: 1,
                pageSize: 15,
                salary: {
                    from: undefined,
                    to: undefined,
                },
                willingnessToTravel: null,
                homeoffice: null,
            }),
        });
        mockTracking.mockRestore();
        mockGetTrackingCategories.mockRestore();
        mockFetchResult.mockRestore();
    });
});
describe('getProfileData', () => {
    it('should return the profile data from fetchJson', async () => {
        const expectedResult: ProfileData = {
            availabilityId: 1,
            furtherEducations: [],
            preferredWorkplaces: [],
            profileId: 123,
            projectsAndAwards: [],
            readyToMove: true,
            statement: 'UNIT TEST STATEMENT',
            experiences: [],
            languages: [],
            educations: [],
            skills: null,
            objective: null,
            interests: ['INTEREST 1', 'INTEREST 2'],
            aboutMe: 'UNIT TEST ABOUT ME',
        };
        const mockFetchJson = vi.spyOn(utils, 'fetchJson').mockImplementation(() => Promise.resolve(expectedResult));
        const result = await getProfileData('123');
        expect(result).toStrictEqual(expectedResult);
        expect(mockFetchJson).toBeCalledTimes(1);
        expect(mockFetchJson.mock.calls[0][0]).toStrictEqual({
            path: `${ENDPOINT}/profile/123`,
            headers: {
                'Content-Type': 'application/json;',
            },
            method: 'GET',
        });
        mockFetchJson.mockRestore();
    });
});
