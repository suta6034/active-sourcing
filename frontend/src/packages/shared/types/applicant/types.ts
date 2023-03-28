import type { Error, Meta } from './repositories/types';

type LastPosition = {
    id: number
    title: string,
    jobFieldId: number,
    experienceMonths: number
}

export type PreferredWorkplaces = Array<Record<string, number | string>> | undefined;

type ObjectiveLocation = {
    preferredWorkplaces: PreferredWorkplaces,
    related: Array<string>,
    readyToMove?: boolean,
}

type Objective = {
    jobs: Array<string>,
    location?: ObjectiveLocation,
}

type ApplicantAttributes = {
    lastPosition?: LastPosition,
    experienceMonths?: number,
    objective?: Objective,
}

export type Applicants<Data> = {
    data: Data| [],
    meta: Meta | null,
    error: Error | null,
}

export type Applicant = {
    attributes: ApplicantAttributes,
    id: string,
    meta: object,
    type: string,
}

export type Range = {
    from: number | undefined | null;
    to: number | undefined | null;
}

export type Location = {
    name: string | null,
    readyToMove: boolean | null,
    radius: number | null,
}

export type Experience = {
    jobFieldId?: number,
    months: Range | undefined,
}

export type Language = {
    id: number,
    level: number,
}

export type FilterSliderValue = 0|1|2|3|4|5

export type SearchTotalOptions = {
    [index: string]:
    string | boolean | Range | Location | Language[] | number[] | Experience[] | FilterSliderValue;
    branches: number[],
    educationGroups: number[],
    employmentTypes: number[],
    exactSearch: boolean,
    experienceMonths: Range,
    jobFields: number[],
    experiences: Experience[],
    keyword: string,
    keywordFilters: number[],
    languages: Language[],
    location: Location,
    salary: Range,
    willingnessToTravel: FilterSliderValue,
    homeoffice: FilterSliderValue,
}

export type FilterLabelItem = {
    id: number;
    label?: string;
}

export type FilterLabel = {
    name: string,
    items: Array<FilterLabelItem>,
}

export type FilterModalLabelNames = {
    educationGroups: string,
    employmentTypes: string,
    branches: string,
    jobFields: string,
}

export type ApplicantSearchData = {
    currentPage: number,
    currentItems: number,
    total: number,
    isNewSearch: boolean,
    isLoading: boolean,
};

export type Company = {
    id: number | null;
    name: string | null;
    address: string | null;
}

export type UserInfo = {
    customerType: 'Unternehmen' | 'Personaldienstleister' | 'Andere'| null;
    firstName: string | null;
    lastName: string | null;
    initials: string | null;
    profilePictureUrl: string | null;
    company: Company | null;
}

export type MessagingObject = {
    subject: string,
    body: string,
    companyId: number | null | undefined,
    profileId: string | undefined
}
