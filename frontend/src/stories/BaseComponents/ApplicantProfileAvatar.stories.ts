import type { Meta, Story } from '@storybook/vue3';
import BaseAvatar from '../../packages/shared/components/base/BaseAvatar.vue';

export default {
    title: 'Base Components/Avatar',
    component: BaseAvatar,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { BaseAvatar },
    setup() {
        return { args };
    },
    template: '<BaseAvatar v-bind="args"/>',
});

export const Default: Story = Template.bind({});
Default.args = {};

export const Pending: Story = Template.bind({});
Pending.args = {
    isPending: true,
};
