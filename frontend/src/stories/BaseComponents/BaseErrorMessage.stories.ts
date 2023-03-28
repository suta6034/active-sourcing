import type { Meta, Story } from '@storybook/vue3';
import BaseErrorMessage from '../../packages/shared/components/base/BaseErrorMessage.vue';

export default {
    title: 'Base Components/Error Message',
    component: BaseErrorMessage,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { BaseErrorMessage },
    setup() {
        return { args };
    },
    template: '<BaseErrorMessage v-bind="args"/>',
});

export const Default: Story = Template.bind({});
Default.args = {
    message: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
};
