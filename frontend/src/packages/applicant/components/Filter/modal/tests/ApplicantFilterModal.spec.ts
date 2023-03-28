import {
    beforeEach, describe, expect, it, mockEndpoint, render, screen, user,
} from '../../../../../../../tests/drivers/vitest/utils';

import * as filter from '../../../../__test__/preconditions/filter';
import { filterLabels } from '../../../../__test__/preconditions/filter';
import { useFilter } from '../../../../../shared/composables/filter';

import ApplicantFilterModal from '../ApplicantFilterModal.vue';

const {
    filter: filterOptions,
} = useFilter();

beforeEach(async () => {
    filter.hasFilterLabels({ mockEndpoint });
    render(ApplicantFilterModal, {
        props: {
            allFiltersLabels: filterLabels,
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
    };
});

describe('ApplicantFilterRangeInput', () => {
    it('should update range input by typing values in', async () => {
        // salary filter: update values by giving numbers
        const salaryMinInput = await screen.findByTestId('salary min') as HTMLInputElement;
        await user.type(salaryMinInput, '200');
        expect(salaryMinInput.value).toBe('200');
        const salaryMaxInput = await screen.findByTestId('salary max') as HTMLInputElement;
        await user.type(salaryMaxInput, '1000');
        expect(salaryMaxInput.value).toBe('1000');

        // to trigger to update lazily
        await user.click(salaryMinInput);

        expect(filterOptions.value).toStrictEqual({
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
                from: 200,
                to: 1000,
            },
            willingnessToTravel: 0,
        });
    });

    it('should show error validation message when invalid form', async () => {
        // salary filter: giving invalid form values to see validation
        const salaryMinInput = await screen.findByTestId('salary min') as HTMLInputElement;
        await user.type(salaryMinInput, '1000');
        expect(salaryMinInput.value).toBe('1000');
        const salaryMaxInput = await screen.findByTestId('salary max') as HTMLInputElement;
        await user.type(salaryMaxInput, '200');
        expect(salaryMaxInput.value).toBe('200');

        await user.click(await screen.findByTestId('ApplicantFilterModal search button'));
        await screen.findByText('Der Maximalwert muss größer als der Minimalwert sein.');
    });
});

describe('ApplicantFilterEmployment', () => {
    it(
        'should update the employment types filter',
        async () => {
            // employmentTypes filter: select an checkbox item
            const employmentTypeDropdown = await screen.findByRole('button', { name: 'Anstellungsart wählen' });

            await user.click(employmentTypeDropdown);
            expect(employmentTypeDropdown).toBeInTheDocument();

            const employmentTypeItem = await screen.findByRole('checkbox', {
                name: 'Teilzeit',
            });
            await user.click(employmentTypeItem);

            expect(filterOptions.value).toStrictEqual({
                branches: [],
                educationGroups: [],
                employmentTypes: [3961],
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
            });

            // filter modal: reset modal filter
            const filterResetButton = await screen.findByRole('button', {
                name: 'Zurücksetzen',
            });
            await user.click(filterResetButton);

            await user.click(await screen.findByTestId('ApplicantFilterModal search button'));
            expect(filterOptions.value).toStrictEqual({
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
            });
        },
    );
});

describe('ApplicantFilterEducationGroups', () => {
    it(
        'should update the education groups filter',
        async () => {
            // education groups filter: select an checkbox item
            const educationFilterDropdown = await screen.findByRole('button', {
                name: 'Ausbildung wählen',
            });
            await user.click(educationFilterDropdown);

            const educationCheckboxItem = await screen.findByRole('checkbox', { name: 'hauptschule' });
            await user.click(educationCheckboxItem);

            expect(educationCheckboxItem).toBeInTheDocument();

            expect(filterOptions.value).toStrictEqual({
                branches: [],
                educationGroups: [1],
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
            });
        },
    );
});
describe('ApplicantFilterExactSearch', () => {
    it('should show search result when toggling exact search button', async () => {
        const toggleButton = await screen.findByTestId('ApplicantFilterExactSearch toggle button');
        await user.click(toggleButton);

        expect(filterOptions.value).toStrictEqual({
            branches: [],
            educationGroups: [],
            employmentTypes: [],
            exactSearch: true,
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
        });
    });
});
describe('ApplicantFilterKeywordInput', () => {
    it('should update keyword input and keyword filter', async () => {
        // keyword filter: select an checkbox item
        const keywordFilterDropdown = await screen.findByRole('button', {
            name: 'Suche in:',
        });
        await user.click(keywordFilterDropdown);

        const checkBoxItem = await screen.findByText('Wunschjob');
        await user.click(checkBoxItem);

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
            jobFields: [],
            keyword: '',
            keywordFilters: [2],
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
        });
    });
});
