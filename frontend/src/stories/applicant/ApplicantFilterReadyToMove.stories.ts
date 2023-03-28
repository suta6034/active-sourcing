import type { Meta, Story } from '@storybook/vue3';
import ApplicantFilterReadyToMove from '../../packages/applicant/components/Filter/ApplicantFilterReadyToMove.vue';

export default {
    title: 'Applicant Filter/Ready To Move',
    component: ApplicantFilterReadyToMove,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { ApplicantFilterReadyToMove },
    setup() {
        return { args };
    },
    template: '<ApplicantFilterReadyToMove v-bind="args"/>',
});

export const Default: Story = Template.bind({});
Default.args = {};
