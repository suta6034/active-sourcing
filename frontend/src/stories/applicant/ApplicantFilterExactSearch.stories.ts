import type { Meta, Story } from '@storybook/vue3';
import ApplicantFilterExactSearch from '../../packages/applicant/components/Filter/ApplicantFilterExactSearch.vue';

export default {
    title: 'Applicant Filter/Exact Search',
    component: ApplicantFilterExactSearch,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { ApplicantFilterExactSearch },
    setup() {
        return { args };
    },
    template: '<ApplicantFilterExactSearch v-bind="args"/>',
});

export const Default: Story = Template.bind({});
Default.args = {};
