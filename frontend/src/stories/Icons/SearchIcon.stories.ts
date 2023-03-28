import type { Meta, Story } from '@storybook/vue3';
import SearchIcon from '../../packages/shared/assets/icons/SearchIcon.vue';

export default {
    title: 'Icons/Search',
    component: SearchIcon,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { SearchIcon },
    setup() {
        return { args };
    },
    template: '<svg><SearchIcon/></svg>',
});

export const Default: Story = Template.bind({});
Default.args = {};
