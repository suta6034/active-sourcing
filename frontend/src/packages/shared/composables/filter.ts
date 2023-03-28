import { ref } from 'vue';
import { allFiltersLabels } from '../../applicant/repositories/filter-repository';

import type {
    SearchTotalOptions,
    Range,
    FilterLabel,
    FilterLabelItem, Experience,
} from '../types/applicant/types';

const RangeFilterKeys = ['salary', 'experienceMonths'];
const SingleValueFilterKeys = ['keyword', 'willingnessToTravel', 'homeoffice'];
const ArrayFilterKeys = [
    'keywordFilters',
    'educationGroups',
    'employmentTypes',
    'branches',
    'jobFields',
    'languages',
    'experiences',
];
const ObjectFilterKeys = ['location'];

// employmentTypes: [3960] is 'Vollzeit'
const filter = ref<SearchTotalOptions>({
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
        readyToMove: true,
        radius: 0,
    },
    salary: {
        from: undefined,
        to: undefined,
    },
    willingnessToTravel: 0,
    homeoffice: 0,
});

const exactSearch = ref(false);

export const useFilter = () => {
    const updateObjectFilter = (
        group: string,
        key: string,
        value: string | boolean | number | null,
    ) => {
        if (filter.value[group] != null) {
            const filterGroup = filter.value[group] as Record<string, string | boolean | number | null>;
            filterGroup[key] = value;
            return true;
        }
        return false;
    };

    const updateArrayFilter = (
        group: string,
        id: number | string | Array<Record<string, number>> | Array<Experience>,
    ): boolean => {
        let filterGroup: Array<number | string | Record<string, number> | Experience> = [];
        if (filter.value[group]) {
            if (Array.isArray(id)) {
                (filter.value[group] as Array<Record<string, number>> | Array<Experience>) = id;
                return true;
            }
            filterGroup = filter.value[group] as Array<number | string | Record<string, number>>;
        }
        if (filterGroup.includes(id as number | string | Experience)) {
            filterGroup = filterGroup.filter((value) => value !== id);
        } else {
            filterGroup.push(id as number | string | Experience);
        }
        (filter.value[group] as Array<number | string | Record<string, number> | Experience>) = filterGroup;
        return true;
    };

    const updateRangeFilter = (group: string, key: 'from' | 'to', value: number | undefined | null): boolean => {
        if (filter.value[group] != null) {
            const filterGroup = filter.value[group] as Range;
            filterGroup[key] = value;
            return true;
        }
        return false;
    };

    const updateFilter = ({ group, id, key }:{
        group: string,
        id: number | string | undefined | null | Array<Record<string, number>> | Array<Experience>,
        key?: string,
    }) => {
        if (ArrayFilterKeys.includes(group) && id != null) {
            return updateArrayFilter(group, id);
        }
        if (SingleValueFilterKeys.includes(group) && (
            typeof id === 'string'
            || typeof id === 'number'
        )) {
            filter.value[group] = id;
            return true;
        }
        if (RangeFilterKeys.includes(group) && key != null) {
            return updateRangeFilter(
                group,
                key as 'from' | 'to',
                id as number | undefined | null,
            );
        }
        if (ObjectFilterKeys.includes(group) && key != null) {
            return updateObjectFilter(
                group,
                key as string,
                id as number | string | boolean | null,
            );
        }
        return false;
    };

    const getFilterLabelItems = (filterName: string): FilterLabelItem[] | null => {
        if (allFiltersLabels.value.length) {
            const filterItems = allFiltersLabels.value.find((val: FilterLabel) => val.name === filterName);
            if (filterItems?.items) {
                return filterItems.items;
            }
        }
        return null;
    };

    /**
     * Gets the label of the given filter item
     * @param filterName the name of the filter where the filter item is in
     * @param id the id of the filter item of where the label should be looked up
     * @returns the label of the found filter item or an empty string if nothing was found
     */
    const getLabelForFilter = (filterName: string, id: number | string): string => {
        const filterItems = getFilterLabelItems(filterName);
        if (filterItems?.length) {
            const filterItem = filterItems.find((val: {id?: number, label?: string}) => val.id === id);
            if (filterItem?.label) {
                return filterItem.label;
            }
        }
        return '';
    };

    const resetModalFilter = () => {
        filter.value = {
            ...filter.value,
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
                name: filter.value.location.name,
                readyToMove: true,
                radius: filter.value.location.radius,
            },
            salary: {
                from: undefined,
                to: undefined,
            },
            willingnessToTravel: 0,
            homeoffice: 0,
        };
    };

    return {
        exactSearch,
        filter,
        updateFilter,
        resetModalFilter,
        getLabelForFilter,
        getFilterLabelItems,
    };
};
