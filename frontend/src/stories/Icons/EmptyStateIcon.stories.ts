import type { Meta, Story } from '@storybook/vue3';
import EmptyStateIcon from '../../packages/shared/assets/icons/EmptyStateIcon.vue';

export default {
    title: 'Icons/Empty State',
    component: EmptyStateIcon,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { EmptyStateIcon },
    setup() {
        return { args };
    },
    template: '<svg viewBox="0 0 1173.35 950.34"'
    + ' class="3xl:w-[500px] 3xl:h-[400px] w-1/2 h-1/2"><EmptyStateIcon/></svg>',
});

export const Default: Story = Template.bind({});
Default.args = {};
