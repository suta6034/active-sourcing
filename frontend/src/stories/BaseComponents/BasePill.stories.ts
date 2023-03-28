import type { Meta, Story } from '@storybook/vue3';
import BasePill from '../../packages/shared/components/base/BasePill.vue';

export default {
    title: 'Base Components/Pill',
    component: BasePill,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { BasePill },
    setup() {
        return { args };
    },
    template: '<div style="max-width: 242px"><BasePill v-bind="args"/></div>',
});

export const Default: Story = Template.bind({});
Default.args = {
    selectedLabel: 'Base Pill',
};

export const OverflownText = Template.bind({});
OverflownText.args = {
    selectedLabel: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

export const WithDots = Template.bind({});
WithDots.args = {
    selectedLabel: 'Base Pill',
    showDots: true,
    filledDots: 2,
};

export const WithGrayBackground = Template.bind({});
WithGrayBackground.args = {
    selectedLabel: 'Base Pill',
    grayBackground: true,
};

export const WithThreeFilledDotsAndGrayBackground = Template.bind({});
WithThreeFilledDotsAndGrayBackground.args = {
    selectedLabel: 'Base Pill',
    showDots: true,
    filledDots: 3,
    grayBackground: true,
};

export const OverflownTextWithDots = Template.bind({});
OverflownTextWithDots.args = {
    selectedLabel: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    showDots: true,
    filledDots: 2,
};
