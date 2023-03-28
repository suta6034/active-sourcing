import type { Meta, Story } from '@storybook/vue3';
import ApplicantFilterLanguage from '../../packages/applicant/components/Filter/ApplicantFilterLanguage.vue';
import { allFiltersLabels } from '../../packages/applicant/repositories/filter-repository';

export default {
    title: 'Applicant Filter/Language',
    component: ApplicantFilterLanguage,
    argTypes: {},
} as Meta;

allFiltersLabels.value = [{
    name: 'languages',
    items: [
        {
            label: 'Deutsch',
            id: 1,
        },
        {
            label: 'Englisch',
            id: 2,
        },
        {
            label: 'Spanisch',
            id: 3,
        },
    ],
},
{
    name: 'languageLevels',
    items: [
        {
            label: 'Alle',
            id: 1,
        },
        {
            label: 'Grundkenntnisse',
            id: 2,
        },
        {
            label: 'Gut',
            id: 3,
        },
        {
            label: 'Fließend',
            id: 4,
        },
        {
            label: 'Muttersprache',
            id: 5,
        },
    ],
},
];

const Template: Story = (args) => ({
    components: { ApplicantFilterLanguage },
    setup() {
        return { args };
    },
    template: '<ApplicantFilterLanguage v-bind="args"/>',
});

export const Default: Story = Template.bind({});
Default.args = {};
