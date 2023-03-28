import type { Meta, Story } from '@storybook/vue3';
import AvatarPending from '../../packages/shared/assets/icons/AvatarPending.vue';

export default {
    title: 'Icons/Avatar Pending',
    component: AvatarPending,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { AvatarPending },
    setup() {
        return { args };
    },
    template: '<svg><AvatarPending/></svg>',
});

export const Default: Story = Template.bind({});
Default.args = {};
