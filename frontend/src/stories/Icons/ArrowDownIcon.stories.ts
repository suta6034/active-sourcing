import type { Meta, Story } from '@storybook/vue3';
import ArrowDownIcon from '../../packages/shared/assets/icons/ArrowDownIcon.vue';

export default {
    title: 'Icons/Arrow Down',
    component: ArrowDownIcon,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { ArrowDownIcon },
    setup() {
        return { args };
    },
    template: '<svg><ArrowDownIcon/></svg>',
});

export const Default: Story = Template.bind({});
Default.args = {};
