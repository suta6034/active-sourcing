import type { Meta, Story } from '@storybook/vue3';
import AvatarLockedIcon from '../../packages/shared/assets/icons/AvatarLockedIcon.vue';

export default {
    title: 'Icons/Avatar Locked',
    component: AvatarLockedIcon,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { AvatarLockedIcon },
    setup() {
        return { args };
    },
    template: '<svg><AvatarLockedIcon/></svg>',
});

export const Default: Story = Template.bind({});
Default.args = {};
