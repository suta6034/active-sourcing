import type { Meta, Story } from '@storybook/vue3';
import MessageIcon from '../../packages/shared/assets/icons/MessageIcon.vue';

export default {
    title: 'Icons/Message',
    component: MessageIcon,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { MessageIcon },
    setup() {
        return { args };
    },
    template: '<svg><MessageIcon/></svg>',
});

export const Default: Story = Template.bind({});
Default.args = {};
