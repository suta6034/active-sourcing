import type { Meta, Story } from '@storybook/vue3';
import FilterIcon from '../../packages/shared/assets/icons/FilterIcon.vue';

export default {
    title: 'Icons/Filter',
    component: FilterIcon,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { FilterIcon },
    setup() {
        return { args };
    },
    template: '<svg><FilterIcon/></svg>',
});

export const Default: Story = Template.bind({});
Default.args = {};
