import type { Meta, Story } from '@storybook/vue3';
import SortIcon from '../../packages/shared/assets/icons/SortIcon.vue';

export default {
    title: 'Icons/Sort',
    component: SortIcon,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { SortIcon },
    setup() {
        return { args };
    },
    template: '<svg><SortIcon/></svg>',
});

export const Default: Story = Template.bind({});
Default.args = {};
