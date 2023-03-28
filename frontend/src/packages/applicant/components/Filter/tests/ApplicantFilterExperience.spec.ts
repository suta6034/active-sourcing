import { flushPromises, mount } from '@vue/test-utils';
import {
    describe, expect, it, vi, type GenericWrapper,
} from '../../../../../../tests/drivers/vitest/utils';

import { allFiltersLabels } from '../../../repositories/filter-repository';
import * as filterComposable from '../../../../shared/composables/filter';
import type { FilterLabelItem, Range } from '../../../../shared/types/applicant/types';

import ApplicantFilterExperience from '../ApplicantFilterExperience.vue';

allFiltersLabels.value = [{
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
];

describe('Applicant Filter - Experience', () => {
    it('should not render any item since it does not have any entries', async () => {
        const wrapper = mount(ApplicantFilterExperience, {
            props: {},
        });
        // add first experience element
        const addButton = wrapper.find('button.AddExperience');
        await addButton.trigger('click');

        const jobFieldButton = wrapper.find('.SelectJobField button');
        expect(jobFieldButton.text()).toStrictEqual('Berufsfeld wählen');
        expect(jobFieldButton.exists()).toBe(true);

        // level buttons has to be disabled if no experience is selected
        const fromInput = wrapper.find('.experiences-min input');
        expect(fromInput.exists()).toBe(true);
        expect((fromInput.element as HTMLInputElement).placeholder).toBe('min. 0');
        expect((fromInput.element as HTMLInputElement).disabled).toBe(true);
        const toInput = wrapper.find('.experiences-max input');
        expect(toInput.exists()).toBe(true);
        expect((toInput.element as HTMLInputElement).placeholder).toBe('max. 40+');
        expect((toInput.element as HTMLInputElement).disabled).toBe(true);

        // open experience dropdown
        await jobFieldButton.trigger('click');
        const jobFieldList = wrapper.find('.SelectJobField ul');
        expect(jobFieldList.exists()).toBe(true);

        // get first item of list, which should be 'Deutsch'
        const firstElement = jobFieldList.find('li');
        expect(firstElement.exists()).toBe(true);
        expect(firstElement.text()).toStrictEqual('Assistenz, Verwaltung');

        // click on first item of jobField dropdown
        await firstElement.trigger('click');
        // experience dropdown should now have the text 'Assistenz, Verwaltung' and dropdown is gone
        expect(wrapper.find('.SelectJobField button').text()).toStrictEqual('Assistenz, Verwaltung');
        expect(wrapper.find('.SelectJobField ul').exists()).toBe(false);

        // level inputs shouldn't be disabled anymore
        expect((wrapper.find('.experiences-min input').element as HTMLButtonElement).disabled).toBe(false);
        expect((wrapper.find('.experiences-max input').element as HTMLButtonElement).disabled).toBe(false);

        // delete entry
        const deleteButton = wrapper.find('button.DeleteEntry');
        expect(deleteButton.exists()).toBe(true);
        await deleteButton.trigger('click');
        expect(wrapper.find('.SelectJobField button').exists()).toBe(false);
        expect(wrapper.find('.experiences-min input').exists()).toBe(false);
        expect(wrapper.find('.experiences-max input').exists()).toBe(false);
        expect(wrapper.find('button.AddExperience').exists()).toBe(true);
    });
    it('should not allow to add more than three experience items', async () => {
        const wrapper = mount(ApplicantFilterExperience, {
            props: {},
        });
        let addButton = wrapper.find('button.AddExperience');
        expect(addButton.exists()).toBe(true);

        // add first element
        await addButton.trigger('click');
        expect(wrapper.findAll('.ApplicantFilterExperienceItem').length).toBe(1);
        addButton = wrapper.find('button.AddExperience');
        expect(addButton.exists()).toBe(true);

        // add second element
        await addButton.trigger('click');
        expect(wrapper.findAll('.ApplicantFilterExperienceItem').length).toBe(2);
        addButton = wrapper.find('button.AddExperience');
        expect(addButton.exists()).toBe(true);

        // add third element
        await addButton.trigger('click');
        expect(wrapper.findAll('.ApplicantFilterExperienceItem').length).toBe(3);
        addButton = wrapper.find('button.AddExperience');
        expect(addButton.exists()).toBe(false);
    });
    it('should render error message when invalid form', async () => {
        const wrapper = mount(ApplicantFilterExperience, {
            props: {
                selected: [{ jobFieldId: 3090, months: { from: 12, to: 24 } }],
            },
        });
        await flushPromises();

        // change months to invalid form
        const fromInput = wrapper.find('.experiences-min input');
        await fromInput.setValue(14);
        const toInput = wrapper.find('.experiences-max input');
        await toInput.setValue(12);

        // get error message
        const errorMessage = wrapper.find('.ErrorMessage');
        expect(errorMessage.text()).toStrictEqual('Der Maximalwert muss größer als der Minimalwert sein.');
    });
    it('should render the experience filter with preselected job field and months', async () => {
        const wrapper = mount(ApplicantFilterExperience, {
            props: {
                selected: [
                    { jobFieldId: 3090, months: { from: 12, to: 24 } },
                    { jobFieldId: 3085, months: undefined },
                    { jobFieldId: undefined, months: undefined },
                ],
            },
        });
        await flushPromises();
        let addButton = wrapper.find('button.AddExperience');
        let jobFieldFilterItems = wrapper.findAll('.ApplicantFilterExperienceItem');
        expect(jobFieldFilterItems.length).toBe(3);
        expect(addButton.exists()).toBe(false);
        // check entries
        // first entry
        expect(jobFieldFilterItems[0].find('.SelectJobField button').text()).toStrictEqual('Beratung, Consulting');
        let fromInput = jobFieldFilterItems[0].find('.experiences-min input');
        expect((fromInput.element as HTMLInputElement).value).toStrictEqual('1');
        expect((fromInput.element as HTMLInputElement).disabled).toBe(false);
        let toInput = jobFieldFilterItems[0].find('.experiences-max input');
        expect((toInput.element as HTMLInputElement).value).toStrictEqual('2');
        expect((toInput.element as HTMLInputElement).disabled).toBe(false);

        // second entry
        expect(jobFieldFilterItems[1].find('.SelectJobField button').text()).toStrictEqual('Assistenz, Verwaltung');
        fromInput = jobFieldFilterItems[1].find('.experiences-min input');
        expect((fromInput.element as HTMLInputElement).value).toStrictEqual('0');
        expect((fromInput.element as HTMLInputElement).disabled).toBe(false);
        toInput = jobFieldFilterItems[1].find('.experiences-max input');
        expect((toInput.element as HTMLInputElement).value).toStrictEqual('');
        expect((toInput.element as HTMLInputElement).disabled).toBe(false);

        // third entry
        expect(jobFieldFilterItems[2].find('.SelectJobField button').text()).toStrictEqual('Berufsfeld wählen');
        fromInput = jobFieldFilterItems[2].find('.experiences-min input');
        expect((fromInput.element as HTMLInputElement).value).toStrictEqual('');
        expect((fromInput.element as HTMLInputElement).disabled).toBe(true);
        toInput = jobFieldFilterItems[2].find('.experiences-max input');
        expect((toInput.element as HTMLInputElement).value).toStrictEqual('');
        expect((toInput.element as HTMLInputElement).disabled).toBe(true);

        // delete second entry and check if entries are still correct
        await jobFieldFilterItems[1].find('button.DeleteEntry').trigger('click');
        jobFieldFilterItems = wrapper.findAll('.ApplicantFilterExperienceItem');
        expect(jobFieldFilterItems.length).toBe(2);

        expect(jobFieldFilterItems[0].find('.SelectJobField button').text()).toStrictEqual('Beratung, Consulting');
        fromInput = jobFieldFilterItems[0].find('.experiences-min input');
        expect((fromInput.element as HTMLInputElement).value).toStrictEqual('1');
        expect((fromInput.element as HTMLInputElement).disabled).toBe(false);
        toInput = jobFieldFilterItems[0].find('.experiences-max input');
        expect((toInput.element as HTMLInputElement).value).toStrictEqual('2');
        expect((toInput.element as HTMLInputElement).disabled).toBe(false);

        expect(jobFieldFilterItems[1].find('.SelectJobField button').text()).toStrictEqual('Berufsfeld wählen');
        fromInput = jobFieldFilterItems[1].find('.experiences-min input');
        expect((fromInput.element as HTMLInputElement).value).toStrictEqual('');
        expect((fromInput.element as HTMLInputElement).disabled).toBe(true);
        toInput = jobFieldFilterItems[1].find('.experiences-max input');
        expect((toInput.element as HTMLInputElement).value).toStrictEqual('');
        expect((toInput.element as HTMLInputElement).disabled).toBe(true);
        addButton = wrapper.find('button.AddExperience');
        expect(addButton.exists()).toBe(true);
    });
    it('should be able to deselect an experience', async () => {
        const wrapper = mount(ApplicantFilterExperience, {
            props: {
                selected: [{ jobFieldId: 3090, months: { from: 12, to: 24 } }],
            },
        });
        await flushPromises();
        let jobFieldFilterItems = wrapper.findAll('.ApplicantFilterExperienceItem');
        expect(jobFieldFilterItems.length).toBe(1);
        // check entries
        expect(jobFieldFilterItems[0].find('.SelectJobField button').text()).toStrictEqual('Beratung, Consulting');
        let fromInput = wrapper.find('.experiences-min input');
        expect((fromInput.element as HTMLInputElement).value).toStrictEqual('1');
        let toInput = wrapper.find('.experiences-max input');
        expect((toInput.element as HTMLInputElement).value).toStrictEqual('2');

        // change months
        await fromInput.setValue(12);
        expect((fromInput.element as HTMLInputElement).value).toStrictEqual('12');
        await toInput.setValue(14);
        expect((toInput.element as HTMLInputElement).value).toStrictEqual('14');

        // select different job field and months
        await jobFieldFilterItems[0].find('.SelectJobField button').trigger('click');
        await jobFieldFilterItems[0].findAll('ul li')[0].trigger('click');
        jobFieldFilterItems = wrapper.findAll('.ApplicantFilterExperienceItem');
        expect(jobFieldFilterItems[0].find('.SelectJobField button').text()).toStrictEqual('Assistenz, Verwaltung');

        // months value should not be changed
        fromInput = wrapper.find('.experiences-min input');
        expect((fromInput.element as HTMLInputElement).value).toStrictEqual('12');
        expect((fromInput.element as HTMLButtonElement).disabled).toBe(false);
        toInput = wrapper.find('.experiences-max input');
        expect((toInput.element as HTMLInputElement).value).toStrictEqual('14');
        expect((toInput.element as HTMLButtonElement).disabled).toBe(false);

        // deselect job field
        await jobFieldFilterItems[0].find('.SelectJobField button').trigger('click');
        await jobFieldFilterItems[0].findAll('ul li')[0].trigger('click');
        jobFieldFilterItems = wrapper.findAll('.ApplicantFilterExperienceItem');
        expect(jobFieldFilterItems[0].find('.SelectJobField button').text()).toStrictEqual('Berufsfeld wählen');
        fromInput = wrapper.find('.experiences-min input');
        expect((fromInput.element as HTMLInputElement).value).toStrictEqual('');
        expect((fromInput.element as HTMLButtonElement).disabled).toBe(true);
        toInput = wrapper.find('.experiences-max input');
        expect((toInput.element as HTMLInputElement).value).toStrictEqual('');
        expect((toInput.element as HTMLButtonElement).disabled).toBe(true);
    });
    describe.each([
        [false, null, null],
        [true, null, null],
        [true, undefined, undefined],
        [true, 0, 0],
        [true, 10, 0],
        [true, 0, 10],
        [true, 13, 20],
    ])('should convert the years correctly to months', (isRangeSet, from, to) => {
        it(`where months is ${isRangeSet ? 'set' : 'unset'}, months.from is '${from}', months.to is '${to}'`, () => {
            const wrapper: GenericWrapper<Partial<{
                convertMonthsToYears: (months: Range | undefined) => Range[]
            }>> = mount(ApplicantFilterExperience);
            let months: Range | undefined;
            if (isRangeSet) {
                months = {
                    from,
                    to,
                };
            }
            const expected: Range = {
                from: 0,
                to: 480,
            };
            if (isRangeSet) {
                if (from) {
                    expected.from = from * 12;
                }
                if (to) {
                    expected.to = to * 12;
                }
            }
            expect(wrapper.vm.convertMonthsToYears?.(months)).toStrictEqual(expected);
        });
    });
    describe.each([
        [false, false],
        [true, false],
        [true, true],
    ])('getFilterLabelItemById', (isIdSet, isItemFound) => {
        it(`where id is ${isIdSet ? 'set' : 'unset'}, an item with the id is ${isItemFound ? '' : 'not '}found`, () => {
            const correctItem = { id: 1, label: 'CORRECT ITEM' };
            const filterLabelItems: Array<FilterLabelItem> = [
                { id: 123, label: 'WRONG ITEM' },
                { id: 456, label: 'WRONG ITEM 2' },
            ];
            if (isItemFound) {
                filterLabelItems.push(correctItem);
            }
            const mockGetFilterLabelItems = vi.fn(() => filterLabelItems);
            const origUseFilter = filterComposable.useFilter();
            const mockUseFilter = vi.spyOn(filterComposable, 'useFilter').mockImplementation(() => ({
                ...origUseFilter,
                getFilterLabelItems: mockGetFilterLabelItems,
            }));
            const wrapper: GenericWrapper<Partial<{
                getFilterLabelItemById: (id?: number) => FilterLabelItem | undefined
            }>> = mount(ApplicantFilterExperience);
            expect(mockGetFilterLabelItems).toHaveBeenCalledOnce();
            const filterLabelItem = wrapper.vm.getFilterLabelItemById?.(isIdSet ? 1 : undefined);
            if (isIdSet && isItemFound) {
                expect(filterLabelItem).toStrictEqual(correctItem);
            } else {
                expect(filterLabelItem).toBeUndefined();
            }
            mockUseFilter.mockRestore();
            mockGetFilterLabelItems.mockRestore();
        });
    });
});
