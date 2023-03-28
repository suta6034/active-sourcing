import type { Meta, Story } from '@storybook/vue3';
import MagnifierIcon from '../../packages/shared/assets/icons/MagnifierIcon.vue';

export default {
    title: 'Icons/Magnifier',
    component: MagnifierIcon,
    argTypes: {},
} as Meta;

const Template: Story = (args) => ({
    components: { MagnifierIcon },
    setup() {
        return { args };
    },
    template: '<svg><MagnifierIcon/></svg>',
});

export const Default: Story = Template.bind({});
Default.args = {};
