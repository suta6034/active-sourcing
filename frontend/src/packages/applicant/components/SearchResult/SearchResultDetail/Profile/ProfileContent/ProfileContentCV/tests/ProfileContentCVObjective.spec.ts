import { flushPromises, mount } from '@vue/test-utils';
import { ref } from 'vue';
import {
    expect, it, mockEndpoint, render, vi,
} from '../../../../../../../../../../tests/drivers/vitest/utils';
import * as breakpointComposable from '../../../../../../../../shared/composables/breakpoint';
import ProfileContentCVObjective from '../ProfileContentCVObjective.vue';
import * as filter from '../../../../../../../__test__/preconditions/filter';
import ApplicantSearchField from '../../../../../../SearchField/ApplicantSearchField.vue';

it('should render the given objectives with salary', async () => {
    vi.spyOn(breakpointComposable, 'useBreakpoint').mockReturnValue(ref(true));
    // add mock label for filter
    filter.hasFilterLabels({ mockEndpoint });
    // trigger filter label
    render(ApplicantSearchField, {
        props: {
            isExtended: false,
        },
    });
    const entries = {
        jobs: [
            'Expatriate',
            'Business Unit Manager',
            'Produktmanagement',
            'Organisationsentwicklung',
            'Changemanagement',
            'Innovationsmanagement',
            'Senior Projekt Manager',
        ],
        employmentTypeIds: [3960, 3961],
        salary: 5600,
    };
    const wrapper = mount(ProfileContentCVObjective, {
        props: {
            entries,
        },
    });
    await flushPromises();

    const clampedContainer = wrapper.find('.ClampedContainer');
    expect(clampedContainer.exists()).toBe(true);
    expect(clampedContainer.text()).toStrictEqual(
        'Expatriate, Business Unit Manager, Produktmanagement, '
        + 'Organisationsentwicklung, Changemanagement, Innovationsmanagement, Senior Projekt Manager',
    );

    const employmentType = wrapper.find('.EmploymentType');
    expect(employmentType.text()).toStrictEqual('Vollzeit, Teilzeit');

    const salary = wrapper.find('.ObjectiveSalary');
    expect(salary.text()).toStrictEqual('€ 5.600');

    const clampedElement = wrapper.find('.ClampedTextElement');
    Object.defineProperty(clampedElement.element, 'scrollHeight', { value: 200 });
    Object.defineProperty(clampedElement.element, 'clientHeight', { value: 100 });

    window.dispatchEvent(new Event('resize'));
    await flushPromises();

    const moreButton = wrapper.find('.ShowMoreButton');
    expect(moreButton.exists()).toBe(true);
    await moreButton.trigger('click');

    const allElementsContainer = wrapper.find('.ShowAllElementContainer');
    expect(allElementsContainer.exists()).toBe(true);
});
it('should render empty profile content with not specified salary', async () => {
    vi.spyOn(breakpointComposable, 'useBreakpoint').mockReturnValue(ref(true));
    // add mock label for filter
    filter.hasFilterLabels({ mockEndpoint });
    // trigger filter label
    render(ApplicantSearchField, {
        props: {
            isExtended: false,
        },
    });
    const entries = {
        jobs: [],
        employmentTypeIds: [],
        salary: null,
    };
    const wrapper = mount(ProfileContentCVObjective, {
        props: {
            entries,
        },
    });
    await flushPromises();

    const salary = wrapper.find('.ObjectiveSalary');
    expect(salary.text()).toStrictEqual('Nicht angegeben');
});
