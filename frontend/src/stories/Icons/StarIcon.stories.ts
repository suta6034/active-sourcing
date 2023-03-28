import type { Meta, Story } from '@storybook/vue3';
import StarIcon from '../../packages/shared/assets/icons/StarIcon.vue';

export default {
    title: 'Icons/Star',
    component: StarIcon,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { StarIcon },
    setup() {
        return { args };
    },
    template: '<svg><StarIcon/></svg>',
});

export const Default: Story = Template.bind({});
Default.args = {};
