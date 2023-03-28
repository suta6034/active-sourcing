import { flushPromises, mount } from '@vue/test-utils';

import {
    expect,
    it,
    describe,
    beforeEach,
    type GenericWrapper,
} from '../../../../../../tests/drivers/vitest/utils';

import ApplicantFilterSlider from '../ApplicantFilterSlider.vue';

import type {
    FilterSliderValue,
} from '../../../../shared/types/applicant/types';

import { useFilter } from '../../../../shared/composables/filter';

const {
    updateFilter,
    filter: filterOptions,
    resetModalFilter,
} = useFilter();

beforeEach(async () => resetModalFilter());

const validSliderFilters = ['homeoffice', 'willingnessToTravel'];

describe.each([[validSliderFilters[0]], [validSliderFilters[1]]])('ApplicantFilterSlider-%#', (targetedFilter) => {
    it(`should update value for the ${targetedFilter} slider filter when update emit is called`, async () => {
        const stubs = {
            BaseSlider: {
                template: '<div class="BaseSlider"></div>',
            },
        };

        const wrapper: GenericWrapper<Partial<{
            getModelValue: (value: FilterSliderValue) => void
        }>> = mount(ApplicantFilterSlider, {
            props: {
                targetValue: 0,
                label: targetedFilter,
                group: targetedFilter,
            },
            global: {
                stubs,
            },
        });
        const container = wrapper.find(`.ApplicantFilterSlider-${targetedFilter}`);
        expect(container.exists()).toBe(true);

        const BaseSlider = wrapper.find('.BaseSlider');
        expect(BaseSlider.exists()).toBe(true);

        // call the func with parameter '2 days'
        const twoDays = 2;
        wrapper.vm.getModelValue?.(twoDays);
        await flushPromises();
        expect(wrapper.emitted().updateFilter.length).toBe(1);

        updateFilter({
            group: targetedFilter,
            id: twoDays,
        });

        const cleanFilterObject = {
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
                readyToMove: true,
            },
            salary: {
                from: undefined,
                to: undefined,
            },
            willingnessToTravel: 0,
            homeoffice: 0,
        };

        expect(filterOptions.value).toStrictEqual({
            ...cleanFilterObject,
            [targetedFilter]: 2,
        });
    });
});
