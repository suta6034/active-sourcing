import type { Meta, Story } from '@storybook/vue3';
import ArrowUpIcon from '../../packages/shared/assets/icons/ArrowUpIcon.vue';

export default {
    title: 'Icons/Arrow Up',
    component: ArrowUpIcon,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { ArrowUpIcon },
    setup() {
        return { args };
    },
    template: '<svg><ArrowUpIcon/></svg>',
});

export const Default: Story = Template.bind({});
Default.args = {};
