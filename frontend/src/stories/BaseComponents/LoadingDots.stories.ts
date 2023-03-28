import type { Meta, Story } from '@storybook/vue3';
import BaseLoadingDots from '../../packages/shared/components/base/BaseLoadingDots.vue';

export default {
    title: 'Base Components/Loading Dots',
    component: BaseLoadingDots,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { BaseLoadingDots },
    setup() {
        return { args };
    },
    template: '<BaseLoadingDots v-bind="args"/>',
});

export const Default: Story = Template.bind({});
Default.args = {};
