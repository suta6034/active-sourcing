import type { Meta, Story } from '@storybook/vue3';
import ThumbsDownIcon from '../../packages/shared/assets/icons/ThumbsDownIcon.vue';

export default {
    title: 'Icons/ThumbsDown',
    component: ThumbsDownIcon,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { ThumbsDownIcon },
    setup() {
        return { args };
    },
    template: '<svg><ThumbsDownIcon/></svg>',
});

export const Default: Story = Template.bind({});
Default.args = {};
