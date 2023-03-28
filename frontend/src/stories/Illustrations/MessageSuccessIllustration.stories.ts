import type { Meta, Story } from '@storybook/vue3';

import MessageSuccessIcon from '../../packages/shared/assets/icons/MessageSuccessIcon.vue';

export default {
    title: 'Illustrations/MessageSuccess',
    component: MessageSuccessIcon,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { MessageSuccessIcon },
    setup() {
        return { args };
    },
    template: '<svg class="h-[260px] w-[220px]"><MessageSuccessIcon/></svg>',
});

export const Default: Story = Template.bind({});
Default.args = {};
