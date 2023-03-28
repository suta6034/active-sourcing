/* eslint-disable max-len */
import type { Meta, Story } from '@storybook/vue3';
import ProfileContentCVObjective
// eslint-disable-next-line max-len
    from '../../packages/applicant/components/SearchResult/SearchResultDetail/Profile/ProfileContent/ProfileContentCV/ProfileContentCVObjective.vue';
import { allFiltersLabels } from '../../packages/applicant/repositories/filter-repository';

export default {
    title: 'Applicant Info/Objective',
    component: ProfileContentCVObjective,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { ProfileContentCVObjective },
    setup() {
        return { args };
    },
    template: `<div ${args.properties}><ProfileContentCVObjective v-bind="args"/></div>`,
});

allFiltersLabels.value = [
    {
        name: 'employmentTypes',
        items: [
            {
                id: 3960,
                label: 'Vollzeit',
            },
            {
                id: 3961,
                label: 'Teilzeit',
            },
        ],
    },
];

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

export const Default: Story = Template.bind({});
Default.args = {
    entries,
};

export const withMoreButton: Story = Template.bind({});
withMoreButton.args = {
    properties: 'class="w-[550px]"',
    entries: {
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
    },
};
