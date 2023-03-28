import {
    CATEGORIES,
    EVENTS,
    EVENTSPARAMETERS,
    getAllCategoriesInString,
    tracking,
} from '../../../util/tracking/tracking';
import { useFilter } from '../../shared/composables/filter';
import { fetchJson, fetchResult, fetchResponse } from './repository-utils';

import type {
    Applicant, Experience, Language, SearchTotalOptions, MessagingObject,
} from '../../shared/types/applicant/types';
import type { ProfileData } from '../../shared/types/profile/types';
import type { Result } from '../../shared/types/applicant/repositories/types';

const CSRF_TOKEN = document.cookie.replace(/(?:^|.*;\s*)ASP-XSRF-TOKEN\s*=\s*([^;]*).*$|^.*$/, '$1');

const ENDPOINT = import.meta.env.VITE_API_APPLICANT;

const {
    filter,
} = useFilter();

/* POST methods */
const { fetch: originalFetch } = window;
window.fetch = async (...args) => {
    const [resource, config] = args;

    const response = await originalFetch(resource, config);
    if (!response.ok && (response.status === 403)) {
        window.location.reload();
        return Promise.reject(response);
    }
    return response;
};

export const search = async ({
    branches,
    educationGroups,
    employmentTypes,
    experienceMonths,
    jobFields,
    experiences,
    keyword,
    keywordFilters,
    languages,
    location,
    salary,
    willingnessToTravel,
    homeoffice,
}: SearchTotalOptions, page: number):Promise<Result<Applicant[]>> => {
    tracking({
        event: EVENTS.search,
        search_term: null,
        [EVENTSPARAMETERS.keywords]: keyword !== '' ? keyword?.toLowerCase() : null,
        [EVENTSPARAMETERS.locations]: location.name !== '' ? location?.name?.toLowerCase() : null,
        [EVENTSPARAMETERS.filters]: getAllCategoriesInString({
            eventParameter: 'filters',
            categories: {
                experienceJobfield: !!experiences[0]?.jobFieldId,
                experienceYears: !!experiences[0]?.jobFieldId,
                employment: !!employmentTypes.length,
                salary: !!salary.from || !!salary.to,
                branch: !!branches.length,
                education: !!educationGroups.length,
                language: languages[0]?.id,
                readyToMove: location.readyToMove,
                exactSearch: filter.value.exactSearch,
                searchInFilter: !!keywordFilters.length,
                willingnessToTravel: willingnessToTravel > 0,
                homeoffice: homeoffice > 0,
            },
        }),
        [EVENTSPARAMETERS.form_type]: CATEGORIES.form_type.candidateSearch,
    });

    return fetchResult({
        path: `${ENDPOINT}/search`,
        headers: {
            'Content-Type': 'application/json;',
            'ASP-X-XSRF-TOKEN': CSRF_TOKEN,
        },
        method: 'POST',
        body: JSON.stringify({
            branches: [...branches],
            educationGroups: [...educationGroups],
            employmentTypes: [...employmentTypes],
            experienceMonths,
            jobFields: [...jobFields],
            experiences: experiences ? experiences.filter((value: Experience) => value.jobFieldId != null) : [],
            keyword,
            keywordFilters,
            languages: languages ? languages.filter((value: Language) => value.id != null) : [],
            location,
            page,
            pageSize: 15,
            salary,
            willingnessToTravel: willingnessToTravel === 0 ? null : willingnessToTravel,
            homeoffice: homeoffice === 0 ? null : homeoffice,
        }),
    });
};

export const getProfileData = async (applicantId: string):Promise<ProfileData | null> => fetchJson({
    path: `${ENDPOINT}/profile/${applicantId}`,
    headers: {
        'Content-Type': 'application/json;',
    },
    method: 'GET',
});

export const sendApprovalMessage = async ({
    subject, body, companyId, profileId,
}: MessagingObject):Promise<Response> => fetchResponse({
    path: `${ENDPOINT}/approve`,
    headers: {
        'Content-Type': 'application/json;',
        'ASP-X-XSRF-TOKEN': CSRF_TOKEN,
    },
    method: 'POST',
    body: JSON.stringify({
        subject,
        body,
        companyId,
        profileId,
    }),
});
