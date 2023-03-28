import { ref } from 'vue';

import { flushPromises, mount } from '@vue/test-utils';
import {
    beforeEach, describe, expect, it, mockEndpoint, render, screen, user, vi,
} from '../../../../../../tests/drivers/vitest/utils';

import * as filter from '../../../__test__/preconditions/filter';
import { useFilter } from '../../../../shared/composables/filter';
import * as breakpointComposable from '../../../../shared/composables/breakpoint';

import ApplicantSearchField from '../ApplicantSearchField.vue';
import * as AutocompletionService from '../../../repositories/autocompletion-repository';
import { testDataAutocompletionKeyword, testDataAutocompletionLocation } from '../../../__test__/preconditions/data';

vi.doMock('../../../shared/composables/breakpoint');

const {
    filter: filterOptions,
} = useFilter();

beforeEach(async () => {
    document.body.innerHTML = '';
    vi.spyOn(breakpointComposable, 'useBreakpoint').mockReturnValue(ref(true));
    filter.validLocation({ mockEndpoint });
    filter.hasFilterLabels({ mockEndpoint });

    render(ApplicantSearchField, {
        props: {
            isExtended: true,
        },
    });

    filterOptions.value = {
        branches: [],
        educationGroups: [],
        employmentTypes: [],
        exactSearch: false,
        experienceMonths: {
            from: undefined,
            to: undefined,
        },
        experiences: [],
        jobFields: [],
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
        willingnessToTravel: 3,
        homeoffice: 2,
    };
});

describe('ApplicantSearchField', () => {
    it('should show filter modal when clicking filter icon button in the initial search bar', async () => {
        const wrapper = mount(ApplicantSearchField, {});
        const filterButton = wrapper.find('.FilterButton');
        expect(filterButton.exists()).toBe(true);
        await filterButton.trigger('click');
        await flushPromises();
        let filtermodal = document.querySelector('.ApplicantFilterModal') as HTMLElement | null;
        expect(filtermodal).not.toBe(null);
        const closeButton = document.querySelector('.BaseModalCloseButton') as HTMLElement | null;
        expect(closeButton).not.toBe(null);
        closeButton?.click();
        await flushPromises();
        filtermodal = document.querySelector('.ApplicantFilterModal') as HTMLElement | null;
        expect(filtermodal).toBe(null);
    });
    it('should show filter modal full screen on mobile when clicking filter icon button', async () => {
        const wrapper = mount(ApplicantSearchField, {});
        const mockUseBreakPoint = vi.spyOn(breakpointComposable, 'useBreakpoint').mockImplementation(() => ref(true));
        const filterButton = wrapper.find('.FilterButton');
        expect(filterButton.exists()).toBe(true);
        await filterButton.trigger('click');
        await flushPromises();
        let filtermodal = document.querySelector('.ApplicantFilterModal') as HTMLElement | null;
        expect(filtermodal).not.toBe(null);
        const baseModalContainer = document.querySelector('.BaseModalContainer');
        expect(baseModalContainer?.classList.contains('top-0')).toBe(true);
        expect(baseModalContainer?.classList.contains('bottom-0')).toBe(true);
        expect(baseModalContainer?.classList.contains('top-[10vh]')).toBe(false);
        expect(baseModalContainer?.classList.contains('bottom-[10vh]')).toBe(false);
        const closeButton = document.querySelector('.BaseModalCloseButton') as HTMLElement | null;
        expect(closeButton).not.toBe(null);
        closeButton?.click();
        await flushPromises();
        filtermodal = document.querySelector('.ApplicantFilterModal') as HTMLElement | null;
        expect(filtermodal).toBe(null);
        mockUseBreakPoint.mockRestore();
    });
});

describe('ApplicantFilterLocationInput', () => {
    it('should update location input', async () => {
        const mockAc = vi.spyOn(AutocompletionService, 'getAutocompletion')
            .mockImplementation(() => Promise.resolve([]));
        const location = await screen.findByTestId('location input');

        // location input: type string values in
        await user.type(location, 'bar');
        expect(await screen.findByDisplayValue('bar')).toBeInTheDocument();

        expect(filterOptions.value).toStrictEqual({
            branches: [],
            educationGroups: [],
            employmentTypes: [],
            exactSearch: false,
            experienceMonths: {
                from: undefined,
                to: undefined,
            },
            experiences: [],
            homeoffice: 2,
            jobFields: [],
            keyword: '',
            keywordFilters: [],
            languages: [],
            location: {
                name: 'bar',
                radius: 0,
                readyToMove: null,
            },
            salary: {
                from: undefined,
                to: undefined,
            },
            willingnessToTravel: 3,
        });
        mockAc.mockRestore();
    });
});

describe('ApplicantFilterKeywordInput', () => {
    it('should show autocompletion for keyword, select elements with and without accessibility', async () => {
        vi.spyOn(AutocompletionService, 'getAutocompletion')
            .mockImplementation(() => Promise.resolve(testDataAutocompletionKeyword));
        await flushPromises();
        const keyword = await screen.findByTestId('keyword input');
        expect(keyword).toBeInTheDocument();

        await user.type(keyword, 'Jav');
        expect(await screen.findByDisplayValue('Jav')).toBeInTheDocument();
        const autocompletionElements = await screen.findByTestId('autocompletedElements');
        expect(autocompletionElements).toBeInTheDocument();
        // check if there are five elements
        expect(autocompletionElements?.firstElementChild?.childElementCount).toBe(5);

        // click first element via accessibility
        await user.keyboard('{arrowdown}');
        await user.keyboard('{enter}');
        expect(await screen.findByDisplayValue('"Java"')).toBeInTheDocument();

        await user.type(keyword, 'Jav');
        await user.keyboard('{tab}');
        await user.type(keyword, 'Jav');
        await user.keyboard('{escape}');

        // click first element via accessibility arrow up and down
        await user.type(keyword, 'Jav');
        await user.keyboard('{arrowdown}');
        await user.keyboard('{arrowdown}');
        await user.keyboard('{arrowup}');
        await user.keyboard('{enter}');
        expect(await screen.findByDisplayValue('"Java"')).toBeInTheDocument();

        // should close autocompletion
        await user.type(keyword, 'Jav');
        await user.keyboard('{arrowdown}');
        await user.keyboard('{Escape}');

        // click third element
        const element = autocompletionElements?.firstElementChild?.children[2];
        if (element) {
            await user.click(element);
        }
        expect(await screen.findByDisplayValue('"Java Software Entwickler"')).toBeInTheDocument();
    });
});

describe('ApplicantFilterLocationInput', () => {
    it('should show autocompletion for location, select elements with and without accessibility', async () => {
        vi.spyOn(AutocompletionService, 'getAutocompletion')
            .mockImplementation(() => Promise.resolve(testDataAutocompletionLocation));
        await flushPromises();
        const location = await screen.findByTestId('location input');
        expect(location).toBeInTheDocument();

        // location input: type string values in
        await user.type(location, 'Lin');
        expect(await screen.findByDisplayValue('Lin')).toBeInTheDocument();
        const dropdown = await screen.findByTestId('autocompletedElements');
        expect(dropdown).toBeInTheDocument();
        // check if there are five elements
        expect(dropdown?.firstElementChild?.childElementCount).toBe(5);

        // click first element via accessibility
        await user.keyboard('{arrowdown}');
        await user.keyboard('{enter}');
        expect(await screen.findByDisplayValue('"Linz"')).toBeInTheDocument();

        await user.type(location, 'Lin');
        await user.keyboard('{tab}');
        await user.type(location, 'Lin');
        await user.keyboard('{escape}');

        // click first element via accessibility arrow up and down
        await user.type(location, 'Lin');
        await user.keyboard('{arrowdown}');
        await user.keyboard('{arrowdown}');
        await user.keyboard('{arrowup}');
        await user.keyboard('{enter}');
        expect(await screen.findByDisplayValue('"Linz"')).toBeInTheDocument();

        // should close autocompletion
        await user.type(location, 'Lin');
        await user.keyboard('{arrowdown}');
        await user.keyboard('{Escape}');

        // click third element
        const element = dropdown?.firstElementChild?.children[2];
        if (element) {
            await user.click(element);
        }
        expect(await screen.findByDisplayValue('"Lindau"')).toBeInTheDocument();
    });
});

describe('ApplicantFilterNearbySearch', () => {
    it('should get a max radius value 50', async () => {
        const locationInput = await screen.findByTestId('location input');
        await user.type(locationInput, 'linz');
        const mockAc = vi.spyOn(AutocompletionService, 'getAutocompletion')
            .mockImplementation(() => Promise.resolve([]));

        const radiusIncreseButton = await screen.findByTestId('ApplicantFilterNearbySearch increase radius button');

        await user.click(radiusIncreseButton);
        await user.click(radiusIncreseButton);
        await user.click(radiusIncreseButton);
        await user.click(radiusIncreseButton);
        await user.click(radiusIncreseButton);

        // 6th increasing, radius should be 50 not 60
        await user.click(radiusIncreseButton);

        expect(filterOptions.value).toStrictEqual({
            branches: [],
            educationGroups: [],
            employmentTypes: [],
            exactSearch: false,
            experienceMonths: {
                from: undefined,
                to: undefined,
            },
            experiences: [],
            homeoffice: 2,
            jobFields: [],
            keyword: '',
            keywordFilters: [],
            languages: [],
            location: {
                name: 'linz',
                radius: 50,
                readyToMove: null,
            },
            salary: {
                from: undefined,
                to: undefined,
            },
            willingnessToTravel: 3,
        });
        mockAc.mockRestore();
    });

    it('should get a min radius value 0', async () => {
        const locationInput = await screen.findByTestId('location input');
        await user.type(locationInput, 'linz');

        const radiusDecreseButton = await screen.findByTestId('ApplicantFilterNearbySearch decrease radius button');

        // no negative value of radius
        await user.click(radiusDecreseButton);

        expect(filterOptions.value).toStrictEqual({
            branches: [],
            educationGroups: [],
            employmentTypes: [],
            exactSearch: false,
            experienceMonths: {
                from: undefined,
                to: undefined,
            },
            experiences: [],
            homeoffice: 2,
            jobFields: [],
            keyword: '',
            keywordFilters: [],
            languages: [],
            location: {
                name: 'linz',
                radius: 0,
                readyToMove: null,
            },
            salary: {
                from: undefined,
                to: undefined,
            },
            willingnessToTravel: 3,
        });
    });
});
