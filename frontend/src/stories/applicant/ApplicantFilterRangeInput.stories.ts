import type { Meta, Story } from '@storybook/vue3';
import { action } from '@storybook/addon-actions';
import ApplicantFilterRangeInput from '../../packages/applicant/components/Filter/ApplicantFilterRangeInput.vue';

export default {
    title: 'Applicant Filter/Salary',
    component: ApplicantFilterRangeInput,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { ApplicantFilterRangeInput },
    setup() {
        return { args };
    },
    methods: {
        rangeChange: action('rangeChange'),
    },
    template: '<ApplicantFilterRangeInput @rangeChange="rangeChange" v-bind="args"/>',
});

export const Default: Story = Template.bind({});
Default.args = {};

export const FromValueSet: Story = Template.bind({});
FromValueSet.args = {
    from: 10,
};

export const ToValueSet: Story = Template.bind({});
ToValueSet.args = {
    to: 100,
};

export const FromAndToValueSet: Story = Template.bind({});
FromAndToValueSet.args = {
    from: 10,
    to: 100,
};


export const ValuesSetErrorShown: Story = Template.bind({});
ValuesSetErrorShown.args = {
    from: 100,
    to: 10,
};
